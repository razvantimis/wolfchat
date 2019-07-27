// @flow
import { createSlice } from 'redux-starter-kit';
import { FirebaseApi } from '../api/firebase';
import { Subscription } from 'rxjs';
export type Coordinates = {
  lat: number,
  lng: number
}
export type Message = {
  id?: string | null,
  isMy?: boolean,
  senderName: string,
  message: string,
  timestamp?: Date,
}
export type Chatroom = {
  id: string,
  name: string,
  coordinates: Coordinates,
  timestamp?: Date,
  messages: Message[]
}
type IdMapChatRoom = { [id: string]: Chatroom };

type state = { list: IdMapChatRoom, selectedRoomId?: string, filterIds: string[], searchName?: string }
const initialState: state = { list: {}, filterIds: [] };
const roomSlice = createSlice({
  slice: 'room',
  initialState,
  reducers: {
    createChatroom: (state, action) => ({
      ...state,
      list: { ...state.list, [action.payload.newRoom.id]: action.payload.newRoom },
    }),
    resetState: (state, action) => initialState,
    fetchRoomListStarted: (state, action) => ({ ...state, isLoading: true }),
    fetchRoomListSucceeded: (state, action) => ({ ...state, isLoading: false, list: action.payload.roomList }),
    selectedRoom: (state, action) => ({ ...state, selectedRoomId: action.payload.selectedRoom.id }),
    deselectRoom: (state, action) => ({ ...state, selectedRoomId: null }),
    addMessagesToSelectedRoom: (state, action) => {
      const messages = action.payload.messages;
      const oldMessages = state.list[state.selectedRoomId].messages;

      let newMessages;
      if (!oldMessages || (oldMessages && oldMessages.length === 0)) {
        newMessages = messages;
      } else {
        newMessages = messages.filter(m => !oldMessages.find(oldM => oldM.id === m.id));
      }

      if (newMessages.length > 0) {
        return {
          ...state,
          list: {
            ...state.list,
            [state.selectedRoomId]: {
              ...state.list[state.selectedRoomId],
              messages: [...state.list[state.selectedRoomId].messages, ...newMessages]
            }
          }
        };
      } else {
        return state;
      }
    },
    searchRoomByName: (state, action) => {
      const searchName: string = action.payload.searchName;
      const filterIds = Object.values(state.list).filter(room => room.name.includes(searchName.toLowerCase())).map(r => r.id);

      return {
        ...state,
        filterIds,
        searchName
      }
    }
  }
});

export const { actions, reducer } = roomSlice;
export const { resetState, fetchRoomListStarted, fetchRoomListSucceeded, searchRoomByName } = actions;
// action thunk
export const createChatRoom = (chatroom: Chatroom) => async (dispatch: any, getState: any) => {
  const newRoom = await FirebaseApi.createRoom(chatroom);
  dispatch(actions.createChatroom({ newRoom }));
}

export const fetchRoomList = () => async (dispatch: any, getState: any) => {
  dispatch(fetchRoomListStarted());
  const roomList = await FirebaseApi.fetchRoomList();
  if (roomList) {
    dispatch(fetchRoomListSucceeded({
      roomList: roomList.reduce((acc: IdMapChatRoom, room: Chatroom) => {
        acc[room.id] = room;
        return acc;
      }, {})
    }));
  }
}

export const sendMessage = (messageText: string) => async (dispatch: any, getState: () => any) => {
  const { room: { selectedRoomId }, user: { username } } = getState();
  const msg: Message = {
    senderName: username,
    message: messageText
  }
  await FirebaseApi.sendMessage(selectedRoomId, msg);
}

let subListenOnMessageFromRoom: Subscription;
export const selectedRoom = (selectedRoom: Chatroom) => async (dispatch: any, getState: () => any) => {
  const { user: { username } }: { user: { username: string } } = getState();
  subListenOnMessageFromRoom = FirebaseApi.listenOnMessageFromRoom(selectedRoom.id).subscribe((messages: Message[]) => {
    messages = messages.map(m => ({ ...m, isMy: m.senderName.toLowerCase() === username.toLowerCase() }))
    dispatch(actions.addMessagesToSelectedRoom({ messages }));
  })
  dispatch(actions.selectedRoom({ selectedRoom }));
}

export const deselectRoom = () => async (dispatch: any, getState: () => any) => {
  if (subListenOnMessageFromRoom) {
    subListenOnMessageFromRoom.unsubscribe();
  }
  dispatch(actions.deselectRoom());
}

// selectors

export const getRoomListFromState = (state) => {
  if (!!state.room.searchName) {
    return state.room.filterIds.map(id => state.room.list[id]);
  } else {
    return Object.values(state.room.list)
  }
}