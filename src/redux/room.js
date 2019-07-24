// @flow
import { createSlice } from 'redux-starter-kit';
import { FirebaseApi } from '../api/firebase';
type Coordinates = {
  lat: number,
  lng: number
}
export type Chatroom = {
  id?: String,
  name: string,
  coordinates: Coordinates,
  timestamp?: Date
}
type state = { list: Chatroom[] }
const initialState: state = { list: [] };
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
  }
});


export const { actions, reducer } = roomSlice;
export const { resetState, fetchRoomListStarted, fetchRoomListSucceeded } = actions;
// action thunk
export const createChatRoom = (chatroom: Chatroom) => async (dispatch: any, getState: any) => {
  const newRoom = await FirebaseApi.createRoom(chatroom);
  dispatch(actions.createChatroom({ newRoom }));
}


export const fetchRoomList = () => async dispatch => {
  dispatch(fetchRoomListStarted());
  const roomList = await FirebaseApi.fetchRoomList();
  if (roomList) {
    dispatch(fetchRoomListSucceeded({ roomList }));
  }
}