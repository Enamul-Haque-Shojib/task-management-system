
import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';


  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
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