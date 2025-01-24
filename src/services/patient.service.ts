import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Patient } from '../models/patient.model'; // Importa el modelo de paciente

export const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://apihealtyplus1.onrender.com' }),
    endpoints: (builder) => ({
        getPatients: builder.query<Patient[], void>({ // Devuelve un arreglo de pacientes
            query: () => '/patient/Get',
        }),
    }),
});

export const { useGetPatientsQuery } = patientApi;
