import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal-slice.ts';

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
