// @flow
import { createSlice } from 'redux-starter-kit';
import { FirebaseApi } from '../api/firebase';
import { Subscription } from 'rxjs';
export type Coordinates = {
  lat: number,
  lng: number
}
export type Message = {
  id?: number,
  senderName: string,
  message: string,
  timestamp?: Date,
}
export type Chatroom = {
  id?: String,
  name: string,
  coordinates: Coordinates,
  timestamp?: Date,
  messages?: Message[]
}
type state = { list: Chatroom[], selectedRoom: Chatroom | null }
const initialState: state = { list: [], selectedRoom: null };
const roomSlice = createSlice({
  slice: 'room',
  initialState,
  reducers: {
    createChatroom: (state, action) => ({
      ...state,
      list: [...state.list, action.payload.newRoom],
    }),
    resetState: (state, action) => initialState,
    fetchRoomListStarted: (state, action) => ({ ...state, isLoading: true }),
    fetchRoomListSucceeded: (state, action) => ({ ...state, isLoading: false, list: action.payload.roomList }),
    selectedRoom: (state, action) => ({ ...state, selectedRoom: action.payload.selectedRoom }),
    deselectRoom: (state, action) => ({ ...state, selectedRoom: null }),
    addMessagesToSelectedRoom: (state, action) => {
      const newMessages = action.payload.messages;
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
          messages: newMessages,
        }
      };
    },
  }
});

export const { actions, reducer } = roomSlice;
export const { resetState, fetchRoomListStarted, fetchRoomListSucceeded } = actions;
// action thunk
export const createChatRoom = (chatroom: Chatroom) => async (dispatch: any, getState: any) => {
  const newRoom = await FirebaseApi.createRoom(chatroom);
  dispatch(actions.createChatroom({ newRoom }));
}

export const fetchRoomList = () => async (dispatch: any, getState: any) => {
  dispatch(fetchRoomListStarted());
  const roomList = await FirebaseApi.fetchRoomList();
  if (roomList) {
    dispatch(fetchRoomListSucceeded({ roomList }));
  }
}

export const sendMessage = (messageText: string) => async (dispatch: any, getState: () => any) => {
  const { room: { selectedRoom }, user: { username } } = getState();
  const msg: Message = {
    senderName: username,
    message: messageText
  }
  await FirebaseApi.sendMessage(selectedRoom, msg);
}

let subListenOnMessageFromRoom: Subscription;
export const selectedRoom = (selectedRoom: Chatroom) => async (dispatch: any, getState: () => any) => {
  const { user: { username } }: { user: { username: string}} = getState();
  subListenOnMessageFromRoom = FirebaseApi.listenOnMessageFromRoom(selectedRoom).subscribe((messages: Message[]) => {
    messages = messages.map(m => ({ ...m, id: m.senderName.toLowerCase() === username.toLowerCase() ? 0 : 1 }))
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
