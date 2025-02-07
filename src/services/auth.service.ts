import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/auth.model";
import { Doctor } from "../models/medic.model";

export type SignUpResponse = {
  message: string;
  user: User;
};

export type RegisterDoctorResponse = {
  message: string;
  doctor: Doctor;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://backhplus.onrender.com" }),
  endpoints: (builder) => ({
    signIn: builder.mutation<void, Partial<User>>({
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
        url: "/Medic/Post", // Endpoint para registrar doctor
        method: "POST",
        body: doctor,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useRegisterDoctorMutation } = authApi;
