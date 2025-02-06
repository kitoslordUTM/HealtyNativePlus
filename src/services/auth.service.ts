import { User } from "../models/auth.model";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl:'https://backhplus.onrender.com' }),
    endpoints: (builder) => ({

        signIn: builder.mutation<void, Partial<User>>({ 
            query: (user) => ({
                url: '/Auth/signIn', 
                method: 'POST',
                body: user,
            }),
        }),
    }),
});

export const { useSignInMutation } = authApi;


 

