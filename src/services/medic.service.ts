import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Doctor } from "../models/medic.model";
import { Patient } from "../models/patient.model";

export const medicApi = createApi({
  reducerPath: 'medicApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backhplus.onrender.com' }),
  endpoints: (builder) => ({
    addPatientsToDoctor: builder.mutation<Doctor, { doctorId: string; pacientes: string[] }>({
      query: ({ doctorId, pacientes }) => ({
        url: `/Medic/Patch/${doctorId}`,
        method: 'PATCH',
        body: { pacientes },
      }),
    }),

    getDoctorPatients: builder.query<Patient[], string>({
      query: (doctorId) => `/Medic/Get/${doctorId}/Patients`,
    }),

    getDoctorByUserId: builder.query<Doctor, string>({
      query: (userId) => `/Medic/User/${userId}`,
    }),

    // Nueva ruta agregada
    getPatientsByDoctorId: builder.query<Patient[], string>({
      query: (medicId) => `/Medic/Get/${medicId}/Patients`, // Ruta nueva
    }),
  }),
});

export const { 
  useAddPatientsToDoctorMutation, 
  useGetDoctorPatientsQuery, 
  useGetDoctorByUserIdQuery,
  useGetPatientsByDoctorIdQuery // Hook para la nueva consulta
} = medicApi;
