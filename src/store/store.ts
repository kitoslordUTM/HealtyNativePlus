import { configureStore } from "@reduxjs/toolkit";
import { patientApi } from "../services/patient.service";
import { authApi } from "../services/auth.service";
import authslice from "@/view/Login/AuthSlice"
import { medicApi } from "../services/medic.service";
import modalSlice from "@/view/PatientView/PatientSlice"
import { meditionApi } from "../services/medition.service";

export const store = configureStore({
  reducer: {
    modalSlice: modalSlice,
    authslice: authslice,
    [patientApi.reducerPath]: patientApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [medicApi.reducerPath]: medicApi.reducer,
    [meditionApi.reducerPath]: meditionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(authApi.middleware)
      .concat(medicApi.middleware)
      .concat(meditionApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
