"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    problems: [],
    loading: false,
    error: null,
}

export const getData = createAsyncThunk(
    "problems/getData",
    async (page, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/problem?page=${page}&limit=9`, {
                method: "GET",
                headers: {},
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error("Failed to getData");
            }

            const data = await response.json();

            return data; // This is the data returned on successful login
        } catch (error) {
            // console.log(error.message) // Handle API call failure
            // return error.message;
            return rejectWithValue(error.message);
        }
    }
)
export const getProblemsByUsername = createAsyncThunk(
    "problems/getProblemsByUsername",
    async (username, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/problem/userProblems/${username}`, {
                method: "GET",
                headers: {},
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error("Failed to getData");
            }

            const data = await response.json();

            return data; // This is the data returned on successful login
        } catch (error) {
            // console.log(error.message) // Handle API call failure
            // return error.message;
            return rejectWithValue(error.message);
        }
    }
)





const problemSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.loading = false;

                state.problems = action.payload.data;

            })
            .addCase(getData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(getProblemsByUsername.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProblemsByUsername.fulfilled, (state, action) => {
                state.loading = false;

                state.problems = action.payload.data;

            })
            .addCase(getProblemsByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
    },

})

// export const { logout } = authSlice.actions;

export default problemSlice.reducer;