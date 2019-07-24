// @flow
import { createSlice } from 'redux-starter-kit';
export const [SELECTING_COORDINATES, STANDBY, CREATE_NEW_CHAT_ROOM] = ["SELECTING_COORDINATES", "STANDBY", "CREATE_NEW_CHAT_ROOM"];

type Coordinates = {
  lat: number,
  lng: number
}
export type Chatroom = {
  name: string,
  coordinates: Coordinates
}
type state = { step: string, chatroomList: Chatroom[], selectedCoordinates?: Coordinates  }
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
    createChat: (state, action) => ({
      ...initialState,
      chatroomList: [...state.chatroomList, action.payload.newChatroom],
      
    }),
    resetState: (state, action) => initialState
  }
});


export const { actions, reducer } = userSlice;
export const { startSelectionCoordinates, selectedCoordinates, resetState,createChat } = actions;