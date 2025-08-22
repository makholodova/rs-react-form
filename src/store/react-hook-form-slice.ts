import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types';
type ReactHookFormState = {
  usersRHF: User[];
  lastAddedIdRHF: string | null;
};
const initialState: ReactHookFormState = {
  usersRHF: [],
  lastAddedIdRHF: null,
};

const reactHookFormSlice = createSlice({
  name: ' reactHookForm',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload.user;
      state.usersRHF = [user, ...state.usersRHF];
      state.lastAddedIdRHF = action.payload.user.id;
    },
    clearLastAddedRHF(state) {
      state.lastAddedIdRHF = null;
    },
  },
});

export const { addUser, clearLastAddedRHF } = reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
