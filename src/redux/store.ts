import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './features/crud/crudSlice';
// import { rootReducer } from './rootReducer';
// import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    crud: crudReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
export default store;
