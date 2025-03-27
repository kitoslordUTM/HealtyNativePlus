// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string ;
  medicId: string;
  // Otros campos si es necesario
}

const initialState: AuthState = {
  userId: '',
  medicId: ''
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Guardamos el user.id
    },
    setMedicId: (state, action) =>{
      state.medicId = action.payload
    }
    // Otros reducers si es necesario
  },
});


export const { setUserId, setMedicId } = authSlice.actions;
export default authSlice.reducer;
