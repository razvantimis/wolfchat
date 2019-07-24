import { createSlice } from 'redux-starter-kit';
export const [START_CHAT, CHAT_ROOM, CHAT_MESSAGE] = ["START_CHAT", "CHAT_ROOM", "CHAT_MESSAGE"]
const initialState = { username: "razvan", step: CHAT_ROOM };
const userSlice = createSlice({
  slice: 'user',
  initialState,
  reducers: {
    startChat: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
        step: CHAT_ROOM
      }
    }
  }
});


export const { actions, reducer } = userSlice;
export const { startChat } = actions;