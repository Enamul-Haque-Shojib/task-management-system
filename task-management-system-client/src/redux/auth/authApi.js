import { baseApi } from "../api/baseApi"


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        authAccount: builder.mutation({
            
            query: (args) => ({
                url: `auths/account/${args.email}`,
                method: 'POST',
                body: args.userInfo
            }),
          
        }),
      
     
        profileData: builder.mutation({
            query: (email) => ({
                url: `/auths/one-auth/${email}`,
              
                method: 'GET'
            }),
        invalidatesTags:['Users']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `/auths`,
              
                method: 'GET'
            }),
            providesTags: ['Users']
        }),
    })
})

export const { useAuthAccountMutation, useGetAllUsersQuery, useProfileDataMutation } = authApi