import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types';

type UncontrolledFormState = {
  usersUCF: User[];
  lastAddedIdUCF: string | null;
};

const initialState: UncontrolledFormState = {
  usersUCF: [],
  lastAddedIdUCF: null,
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload.user;
      state.usersUCF = [user, ...state.usersUCF];
      state.lastAddedIdUCF = action.payload.user.id;
    },
    clearLastAddedUCF(state) {
      state.lastAddedIdUCF = null;
    },
  },
});

export const { addUser, clearLastAddedUCF } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
