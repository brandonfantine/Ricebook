import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for the headline
const initialState = {
    loading: false,
    headline: '',
    error: null,
};

// Create the slice
const headlineSlice = createSlice({
    name: 'manageHeadline',
    initialState,
    reducers: {
        // Declare and define a reducer to load a user's headline
        loadHeadline: (state) => {
            state.loading = true;
        },
        // Declare and define a reducer to control a user's headline (retrieval and updating)
        manageHeadline: (state, action) => {
            state.headline = action.payload;
        },
        // Declare and define a reducer for when there is an issue with the user's headline
        updateFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export the reducers
export const {
    loadHeadline,
    manageHeadline,
    updateFailure,
} = headlineSlice.actions;

export default headlineSlice;