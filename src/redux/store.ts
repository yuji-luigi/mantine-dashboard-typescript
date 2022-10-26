import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './features/crud/crudSlice';
// import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    crud: crudReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
