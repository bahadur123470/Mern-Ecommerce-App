import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Register User
export const registerUser = createAsyncThunk("/auth/register", 
    async (FormData) => {
        const response = await axios.post("http://localhost:5000/api/auth/register", FormData, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Login User
export const loginUser = createAsyncThunk("/auth/login", 
    async (FormData) => {
        const response = await axios.post("http://localhost:5000/api/auth/login", FormData, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Logout User
export const logoutUser = createAsyncThunk("/auth/logout", 
    async () => {
        const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Check Auth
export const checkAuth = createAsyncThunk("/auth/checkauth", 
    async () => {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        resetAuthState: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.success ? action.payload.user : action.payload;
                state.isAuthenticated = !!state.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setUser, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
