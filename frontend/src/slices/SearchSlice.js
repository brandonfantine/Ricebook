import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new login
const initialState = {
    loading: false,
    search: '',
    posts: [],
    error: null,
};

// Create the slice
const searchSlice = createSlice({
    name: 'manageSearch',
    initialState,
    reducers: {
        // Declare and define a reducer for when posts are loaded
        loadSearchBar: (state) => {
            state.loading = true;
        },
        // Declare and define a reducer to search the posts
        searchQuery: (state, action) => {
            state.search = action.payload;
        },
        // Declare and define a reducer to search the posts
        searchResults: (state, action) => {
            state.posts = action.payload;
        },
    },
});

// Export the reducers
export const {
    loadSearchBar,
    searchQuery,
    searchResults,
} = searchSlice.actions;

export default searchSlice;