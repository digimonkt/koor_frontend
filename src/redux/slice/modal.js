import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: "",
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});
export const { setModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
