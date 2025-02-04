import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new login
const initialState = {
    loading: false,
    post: '',
    comments: [],
    error: null,
};

// Create the slice
const postSlice = createSlice({
    name: 'managePosts',
    initialState,
    reducers: {
        // Declare and define a reducer for when posts are loaded
        loadPosts: (state) => {
            state.loading = true;
        },
        // Declare and define a reducer to update the content of a post
        editPost: (state, action) => {
            state.post = action.payload;
        },
        // Declare and define a reducer to update an existing comment
        editComment: (state, action) => {
            state.comments = action.payload;
        },
        // Declare and define a reducer to write and publish a wholly new post
        writePost: (state, action) => {
            state.post = action.payload;
        },
        // Declare and define a reducer to write and publish a wholly new comment
        writeComment: (state, action) => {
            state.comments = action.payload;
        },
        // Declare and define a reducer for when a post and/or comment cannot be edited
        editFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export the reducers
export const {
    loadPosts,
    editPost,
    editComment,
    writePost,
    writeComment,
    editFailure,
} = postSlice.actions;

export default postSlice;