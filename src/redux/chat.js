// @flow
import { createSlice } from 'redux-starter-kit';
import type { Chatroom } from './room';
export const [SELECTING_COORDINATES, STANDBY, CREATE_NEW_CHAT_ROOM] = ["SELECTING_COORDINATES", "STANDBY", "CREATE_NEW_CHAT_ROOM"];

type state = { step: string, chatroomList: Chatroom[], selectedCoordinates?: Coordinates }
const initialState: state = { step: STANDBY, chatroomList: [] };
const userSlice = createSlice({
  slice: 'chat',
  initialState,
  reducers: {
    startSelectionCoordinates: (state, action) => ({
      ...state,
      step: SELECTING_COORDINATES
    }),
    selectedCoordinates: (state, action) => ({
      ...state,
      selectedCoordinates: action.payload.latlng,
      step: CREATE_NEW_CHAT_ROOM
    }),
    resetState: (state, action) => initialState
  }
});


export const { actions, reducer } = userSlice;
export const { startSelectionCoordinates, selectedCoordinates, resetState } = actions;

