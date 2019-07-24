import {reducer as userReducer} from './user';
import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
});