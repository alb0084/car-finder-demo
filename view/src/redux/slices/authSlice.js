
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Store user information
    isAuthenticated: false, // Indicates if user is logged in
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload; 
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
