import {reducer as userReducer} from './user';
import {reducer as chatReducer} from './chat';
import {configureStore} from 'redux-starter-kit';
import logger from 'redux-logger';
import { persistStore,persistReducer } from 'redux-persist'
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import ReduxThunk from 'redux-thunk';

const middleware = [ReduxThunk, logger]

const persistConfig = {
  key: 'root',
  storage,
}
const reducers = combineReducers({
  user: userReducer,
  chat: chatReducer
});
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
});
export const persistor = persistStore(store);