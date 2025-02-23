import { imageUploadBaseApi } from "../api/baseApi";




const imageUploadApi = imageUploadBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        imageUpload: builder.mutation({
            query: (imageData) => ({
                url: `/dqsm6ybdu/image/upload`,
                method: 'POST',
                body: imageData
            })
        }),
        
    })
});

export const {useImageUploadMutation} = imageUploadApi;