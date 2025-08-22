import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal-slice.ts';
import countriesReducer from './countries-slice.ts';
import uncontrolledFormReducer from './uncontrolled-form-slice.ts';
import reactHookFormReducer from './react-hook-form-slice.ts';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    countries: countriesReducer,
    uncontrolledForm: uncontrolledFormReducer,
    reactHookForm: reactHookFormReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
