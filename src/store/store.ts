import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal-slice.ts';
import countriesReducer from './countries-slice.ts';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    countries: countriesReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
