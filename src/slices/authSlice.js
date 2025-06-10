"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";


const initialState = {
    status: false,
    accessToken: null,
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
                // console.log(response.statusText)
                if (response.status === 401) {
                    throw new Error("Invalid user credentials")
                }
                throw new Error(response.statusText);
            }
            const data = await response.json();
            return data; // This is the data returned on successful login
        } catch (error) {
            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.auth?.accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/logout`, {
                method: "POST",
                headers: {

                    Authorization: `Bearer ${token}`
                },
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error("Failed to logout");
            }

            const data = await response.json();

            return data; // This is the data returned on successful logout
        } catch (error) {
            return rejectWithValue(error.message); // Handle API call failure
        }
    }
);

// export const getCurrentUser = createAsyncThunk(
//     "auth/getCurrentUser",
//     async ({ rejectWithValue, dispatch, getState }) => {
//         try {
//             const state = getState();
//             const token = state.auth?.accessToken;
//             console.log("2")
//             console.log("called")
//             const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/current-user`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`

//                 },
//                 credentials: "include",

//             });

//             if (!response.ok) {
//                 throw new Error("Failed to login");
//             }
//             // if (response.status == 401) {
//             //     await dispatch(refreshToken());
//             // }

//             const data = await response.json();


//             return data; // This is the data returned on successful login
//         } catch (error) {
//             return rejectWithValue(error.message); // Handle API call failure
//         }
//     }
// );
export const refreshToken = createAsyncThunk(
    "auth/refreshtoken", async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_serverURL}/api/users/refresh-token`, {
                method: "POST",
                headers: {

                },
                credentials: "include",

            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();


            // await dispatch(getCurrentUser());
            return data; // This is the data returned on successful login

        } catch (error) {
            // Handle API call failure
            return rejectWithValue(message);
        }
    })


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

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
                // state.userData = action.payload.data.user;
                state.accessToken = action.payload.data.accessToken

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
                state.successMessage = action.payload.message;
                state.accessToken = null
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
            })
            // .addCase(getCurrentUser.pending, (state, action) => {
            //     state.loading = true;
            // })
            // .addCase(getCurrentUser.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.userData = action.payload.data.user;
            //     state.status = true;
            // })
            // .addCase(getCurrentUser.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            //     state.status = false
            // })
            .addCase(refreshToken.pending, (state, action) => {
                state.loading = true;


            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.accessToken = action.payload.data.accessToken
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.error = null;
                state.accessToken = null

            });
    },

})

export const { resetState } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer;