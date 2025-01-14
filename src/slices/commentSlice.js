"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    comments: [],
    loading: false,
    error: null,
    successMessage: false,
};

export const getComments = createAsyncThunk(
    "comments/getComments",
    async (problemId, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/comment/${problemId}`,
                {
                    method: "GET",
                    headers: {},
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to getComments");
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
export const addComments = createAsyncThunk(
    "comments/addComments",
    async (comment, { rejectWithValue }) => {
        // console.log(comment)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/comment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(comment),

                }
            );

            if (!response.ok) {
                throw new Error("Failed to publishProblem");
            }

            const data = await response.json();

            // console.log(data);
            return data; // This is the data returned on successful login
        } catch (error) {
            return rejectWithValue(error.message); // Handle API call failure
        }
    }
)


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;

                state.comments = action.payload.data;

            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(addComments.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComments.fulfilled, (state, action) => {
                state.loading = false;

                // state.comments = action.payload.data;

            })
            .addCase(addComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

    },

})



// export const { logout } = authSlice.actions;

export default commentSlice.reducer;
