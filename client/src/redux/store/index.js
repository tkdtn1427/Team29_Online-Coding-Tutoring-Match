import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TeachersReducer } from '../teacherlist/TeachersReducer';
import { TagReducer } from '../taglist/TagsReducer';
import { UserInfoReducer } from '../user/UserReducer';
import LoginReducer from '../login/LoginReducer';

const rootReducer = combineReducers({
  teachers: TeachersReducer.reducer,
  tags: TagReducer.reducer,
  loginState: LoginReducer.reducer,
  user: UserInfoReducer.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['loginState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// const store = configureStore({
//   reducer: {
//     teachers: TeachersReducer.reducer,
//     tags: TagReducer.reducer,
//     loginState: LoginReducer.reducer,
//     user: UserInfoReducer.reducer,
//   },

// }); // state를 등록해야 사용 가능 등록 규격이 있음

export const persistor = persistStore(store);

export default store;
