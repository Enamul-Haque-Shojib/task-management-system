

import { baseApi } from "../api/baseApi";
import { io } from "socket.io-client";

const socket = io("https://ass-jp-backend.onrender.com", {
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
    getEmailQueryTasks: builder.query({
      query: (email) => ({
        url: `/tasks?email=${email}`,
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
        url: `/tasks/one-task/${id}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    staticsTasks: builder.query({
      query: () => ({
        url: `/tasks/dashboard-auth`,
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
  }),
});

export const { useGetAllTasksQuery, useGetSingleTasksQuery, useGetAllQueryTasksQuery, useGetEmailQueryTasksQuery, useStaticsTasksQuery } = taskApi;



