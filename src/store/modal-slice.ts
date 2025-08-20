import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  contentType: 'uncontrolled-form' | 'react-hook-form' | null;
}

const initialState: ModalState = {
  isOpen: false,
  contentType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.contentType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.contentType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
