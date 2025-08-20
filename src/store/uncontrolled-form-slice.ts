import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types';

const initialState: { users: User[] } = {
  users: [],
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload.user;
      state.users = [user, ...state.users];
    },
  },
});

export const { addUser } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
