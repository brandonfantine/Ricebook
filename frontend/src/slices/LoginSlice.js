import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new login
const initialState = {
    login: false,
    loading: false,
    error: null,
};

// Create the slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // Declare and define a reducer for when the login page is loaded
        loginRequest: (state) => {
            state.loading = true;
            state.error = initialState.error;
        },
        // Declare and define a reducer for when a user is successfully logged in
        loginSuccess: (state, action) => {
            state.loading = initialState.loading;
            state.login = action.payload;
            state.error = initialState.error;
        },
        // Declare and define a reducer for when a user is unsuccessfully logged in
        loginFailure: (state, action) => {
            state.loading = initialState.loading;
            state.login = initialState.login;
            state.error = action.payload;
        },
    },
});

// Export the reducers
export const {
    loginRequest,
    loginSuccess,
    loginFailure,
} = loginSlice.actions;

export default loginSlice;