// import { baseApi } from "../api/baseApi";



// const taskApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllTasks: builder.query({
//             query: () => ({
//                 url: '/tasks',
//                 method: 'GET'
//             }),
//             providesTags:['Tasks']
//         }),
//         getAllQueryTasks: builder.mutation({
//             query: (category) => ({
//                 url: `/tasks?category=${category}`,
//                 method: 'GET'
//             }),
//             invalidatesTags:['Tasks']
//         }),
//         getSingleTasks: builder.query({
//             query: (id) => ({
//                 url: `/tasks/${id}`,
//                 method: 'GET'
//             }),
//             providesTags:['Tasks']
//         }),
     
//     })
// })

// export const { useGetAllTasksQuery,  useGetSingleTasksQuery, useGetAllQueryTasksMutation} = taskApi;




import { baseApi } from "../api/baseApi";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], 
  reconnectionAttempts: 5, 
  reconnectionDelay: 3000, 
});

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: ["Tasks"],
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        try {
            await cacheDataLoaded;
    
            const handleTaskUpdate = () => {
                dispatch(taskApi.util.invalidateTags(["Tasks"])); // Force a refetch on update
            };
    
            if (!socket.hasListeners("taskUpdated")) {  // Prevent duplicate listeners
                socket.on("taskUpdated", handleTaskUpdate);
            }
    
            await cacheEntryRemoved;
            socket.off("taskUpdated", handleTaskUpdate);
        } catch (error) {
            console.error("WebSocket error:", error);
        }
    }
    
    }),
    getAllQueryTasks: builder.query({
      query: (category) => ({
        url: `/tasks?category=${category}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        try {
            await cacheDataLoaded;
    
            const handleTaskUpdate = () => {
                dispatch(taskApi.util.invalidateTags(["Tasks"])); // Force a refetch on update
            };
    
            if (!socket.hasListeners("taskUpdated")) {  // Prevent duplicate listeners
                socket.on("taskUpdated", handleTaskUpdate);
            }
    
            await cacheEntryRemoved;
            socket.off("taskUpdated", handleTaskUpdate);
        } catch (error) {
            console.error("WebSocket error:", error);
        }
    }
    }),
    getSingleTasks: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetAllTasksQuery, useGetSingleTasksQuery, useGetAllQueryTasksQuery } = taskApi;



