 // authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    open: boolean;
    patientId: string;
}

const initialState: ModalState = {
    open: false,
    patientId: "",
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },

        setPatientId: (state, action) => {
            state.patientId = action.payload;
        },
    },
});

export const { setOpen , setPatientId} = modalSlice.actions;
export default modalSlice.reducer;