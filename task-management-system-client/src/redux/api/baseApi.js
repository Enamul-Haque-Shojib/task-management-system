
import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';


  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  });
  
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ['Tasks', 'Users'],
    endpoints: () => ({}),
  });

  export const imageUploadBaseApi = createApi({
    reducerPath: 'imageUploadApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.cloudinary.com/v1_1' }),
    endpoints: () => ({}),
  });