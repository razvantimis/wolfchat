// @flow
import { createSlice } from 'redux-starter-kit';
export const [SELECTING_COORDINATES, STANDBY, CREATE_NEW_CHAT_ROOM, GO_TO_ROOM] = ["SELECTING_COORDINATES", "STANDBY", "CREATE_NEW_CHAT_ROOM", "GO_TO_ROOM"];

type state = { step: string, selectedCoordinates?: Coordinates }
const initialState: state = { step: STANDBY, selectedCoordinates: undefined };
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
    goToRoom: (state, action) => ({
      ...state,
      step: GO_TO_ROOM
    }),
    resetState: (state, action) => initialState
  }
});


export const { actions, reducer } = userSlice;
export const { startSelectionCoordinates, selectedCoordinates, resetState, goToRoom } = actions;

