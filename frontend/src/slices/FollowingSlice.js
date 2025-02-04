import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new login
const initialState = {
    loading: false,
    following: [],
    error: null,
};

// Create the slice
const followingSlice = createSlice({
    name: 'followingList',
    initialState,
    reducers: {
        // Load list of followers for *another* user
        loadFollowers: (state) => {
            state.loading = true;
        },
        // Declare and define a reducer to manage the list of followers (adding and removing)
        manageFollowers: (state, action) => {
            state.following = action.payload;
        },
        // Declare and define a reducer for if an error is encounterd
        errorFollowers: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export the reducers
export const {
    loadFollowers,
    manageFollowers,
    errorFollowers,
} = followingSlice.actions;

export default followingSlice;