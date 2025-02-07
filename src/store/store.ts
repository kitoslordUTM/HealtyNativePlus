import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "../services/patient.service";
import { authApi } from "../services/auth.service";
import authslice from "@/view/Login/AuthSlice"


export const store = configureStore({
  reducer: {
    authslice: authslice,
    [patientApi.reducerPath]: patientApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(authApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
