import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types';

type UncontrolledFormState = {
  users: User[];
  lastAddedId: string | null;
};

const initialState: UncontrolledFormState = {
  users: [],
  lastAddedId: null,
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload.user;
      state.users = [user, ...state.users];
      state.lastAddedId = action.payload.user.id;
    },
    clearLastAdded(state) {
      state.lastAddedId = null;
    },
  },
});

export const { addUser, clearLastAdded } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
