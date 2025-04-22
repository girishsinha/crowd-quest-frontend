"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken } from "./authSlice";

const initialState = {
    userData: null,
    loading: false, // To track API call status
    error: null, // To store error messages
    successMessage: null,

}

export const getUser = createAsyncThunk(
    "profile/getUser",
    async (username, { rejectWithValue, dispatch, getState }) => {

        try {
            const state = getState();
            const token = state.auth?.accessToken;
            // if (!token) {
            //     return rejectWithValue("loggin");
            // }
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/c/${username}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`

                },
                credentials: "include",

            });

            // if (response.status === 401) {
            //     console.log("Token expired, refreshing...");
            //     // const refreshResponse = await dispatch(refreshToken());

            //     if (refreshResponse.meta.requestStatus === "fulfilled") {
            //         console.log("Token refreshed. Retrying getCurrentUser...");

            //         // Retry the getCurrentUser request with the new token
            //         return await dispatch(getCurrentUser()).unwrap();
            //     } else {
            //         return rejectWithValue("Failed to refresh token.");
            //     }
            // }
            if (!response.ok) {
                throw new Error("Failed to load");
            }

            const data = await response.json();


            return data; // This is the data returned on successful login
        } catch (error) {
            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;

            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
    },

})



export default profileSlice.reducer;