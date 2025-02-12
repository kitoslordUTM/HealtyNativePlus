import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Patient } from '../models/patient.model'; // Importa el modelo de paciente

export const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://backhplus.onrender.com' }),
    endpoints: (builder) => ({
        getPatients: builder.query<Patient[], void>({ 
            query: () => '/Patient/Get',
        }),
        
        postPatient: builder.mutation<void, Partial<Patient>>({ 
            query: (newPatient) => ({
                url: '/Patient/Post', 
                method: 'POST',
                body: newPatient,
            }),
        }),

        // Nueva ruta para actualizar un paciente agregando un doctor
        updatePatientDoctor: builder.mutation<void, { patientId: string; doctor: string }>({
            query: ({ patientId, doctor }) => ({
                url: `/Patient/Patch/${patientId}`, 
                method: 'PATCH',
                body: { doctor },
            }),
        }),
    }),
});

export const { 
    useGetPatientsQuery, 
    usePostPatientMutation, 
    useUpdatePatientDoctorMutation 
} = patientApi;
