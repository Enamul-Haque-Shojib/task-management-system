import { baseApi } from "../api/baseApi";



const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTask: builder.mutation({
            query: (taskInfo) => ({
                url: '/tasks/create-task',
                method: 'POST',
                body: taskInfo
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTask: builder.mutation({
            query: (args) => ({
                url: `/tasks/update-task/${args._id}`,
                method: 'PATCH',
                body: args.taskInfo
            }),
            invalidatesTags: ["Tasks"],
        }),
       
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/delete-task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Tasks"],
        }),
      
    })
})

export const {useAddTaskMutation, useUpdateTaskMutation,  useDeleteTaskMutation, } = adminApi;

