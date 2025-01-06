"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null, //user data
    loading: false, // To track API call status
    error: null, // To store error messages
    successMessage: null,
    registered: false
}


export const signup = createAsyncThunk(
    "auth/signup",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Custom-Header": "value",
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to signup");
            }

            const data = await response.json();

            console.log(data)
            return data; // This is the data returned on successful login
        } catch (error) {

            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);




export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData, { rejectWithValue }) => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: "include",
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();

            console.log(data)
            return data; // This is the data returned on successful login
        } catch (error) {

            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error("Failed to logout");
            }

            const data = await response.json();

            return data; // This is the data returned on successful login
        } catch (error) {
            return error.message; // Handle API call failure
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.status = false;
        //     state.userData = null;
        //     state.error = null;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload.data.user;
                state.successMessage = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.registered = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
                state.successMessage = action.payload.message;
                state.registered = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;

            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.registered = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

})

export const { logout } = authSlice.actions;

export default authSlice.reducer;