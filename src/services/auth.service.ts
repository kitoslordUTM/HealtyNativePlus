import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/auth.model";
import { Doctor } from "../models/medic.model";
import { Patient } from "../models/patient.model"; // Importamos el modelo de Paciente

export type SignUpResponse = {
  message: string;
  user: User;
};

export type RegisterDoctorResponse = {
  message: string;
  doctor: Doctor;
};

export type RegisterPatientResponse = {
  message: string;
  patient: Patient;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://backhplus.onrender.com" }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignUpResponse, Partial<User>>({
      query: (user) => ({
        url: "/Auth/signIn",
        method: "POST",
        body: user,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, Partial<User>>({
      query: (user) => ({
        url: "/Auth/signUp",
        method: "POST",
        body: user,
      }),
    }),
    registerDoctor: builder.mutation<RegisterDoctorResponse, Partial<Doctor>>({
      query: (doctor) => ({
        url: "/Medic/Post",
        method: "POST",
        body: doctor,
      }),
    }),
    registerPatient: builder.mutation<RegisterPatientResponse, Partial<Patient>>({
      query: (patient) => ({
        url: "/Patient/Post",
        method: "POST",
        body: patient,
      }),
    }),
  }),
});

export const { 
  useSignInMutation, 
  useSignUpMutation, 
  useRegisterDoctorMutation, 
  useRegisterPatientMutation 
} = authApi;
