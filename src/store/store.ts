import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "../services/patient.service";
import { authApi } from "../services/auth.service";
import authslice from "@/view/Login/AuthSlice"
import { medicApi } from "../services/medic.service";

export const store = configureStore({
  reducer: {
    authslice: authslice,
    [patientApi.reducerPath]: patientApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [medicApi.reducerPath]: medicApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(authApi.middleware)
      .concat(medicApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
