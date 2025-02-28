import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Medition } from '../models/medition.model';

export const meditionApi = createApi({
  reducerPath: 'meditionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backhplus.onrender.com' }),
  endpoints: (builder) => ({
    getMeditions: builder.query<Medition[], string>({
      query: (userId) => `/Medition/user-meditions/${userId}`,
    }),
    
    addMedition: builder.mutation<Medition, { medition: Medition }>({
      query: ({ medition }) => ({
        url: '/Medition/Post',
        method: 'POST',
        body: medition,
      }),
    }),
  }),
});

export const { useGetMeditionsQuery, useAddMeditionMutation } = meditionApi;