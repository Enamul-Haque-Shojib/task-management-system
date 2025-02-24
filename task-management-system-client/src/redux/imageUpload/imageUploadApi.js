import { imageUploadBaseApi } from "../api/baseApi";




const imageUploadApi = imageUploadBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        imageUpload: builder.mutation({
            query: (imageData) => ({
                url: import.meta.env.VITE_ClOUDINARY_API_KEY,
                method: 'POST',
                body: imageData
            })
        }),
        
    })
});

export const {useImageUploadMutation} = imageUploadApi;