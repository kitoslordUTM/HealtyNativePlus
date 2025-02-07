// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: string ;
  // Otros campos si es necesario
}

const initialState: AuthState = {
  userId: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Guardamos el user.id
    },
    // Otros reducers si es necesario
  },
});


export const { setUserId } = authSlice.actions;
export default authSlice.reducer;
