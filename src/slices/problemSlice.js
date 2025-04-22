"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    problems: [],
    loading: false,
    error: null,
    successMessage: false,
};
import { refreshToken, logoutUser } from "@/slices/authSlice";


export const getData = createAsyncThunk(
    "problems/getData",
    async (page, { rejectWithValue, dispatch, getState }) => {
        try {
            const state = getState();
            const token = state.auth?.accessToken;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/problem?page=${page}&limit=9`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    credentials: "include",
                }
            );
            if (response.status == 401) {
                // dispatch(refreshToken())
            }
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            return data; // This is the data returned on successful login

        } catch (error) {
            return rejectWithValue(error.message + " refresh the page");

        }
    }

)
export const getProblemsByUsername = createAsyncThunk(
    "problems/getProblemsByUsername",
    async (username, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth?.accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/problem/userProblems/${username}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error(response.Error);
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

export const publishProblem = createAsyncThunk(
    "problems/publishProblem",
    async (formData, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth?.accessToken;
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/problem`,
                {
                    method: "POST",
                    headers: {
                        "Custom-Header": "value",
                        Authorization: `Bearer ${token}`

                    },
                    body: formData,
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to publishProblem");
            }

            const data = await response.json();

            console.log(data);
            return data; // This is the data returned on successful login
        } catch (error) {
            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);

const problemSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        resetState2: () => initialState,


    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.problems = action.payload.data.reverse();

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
            .addCase(publishProblem.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishProblem.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = true;
            })
            .addCase(publishProblem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

})




export const { resetState2 } = problemSlice.actions;

export default problemSlice.reducer;
