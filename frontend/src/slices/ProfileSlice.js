import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new login
const initialState = {
    loading: false,
    email: '',
    zip: '',
    bday: '',
    phone: '',
    avatar: '',
    newPassword: '',
    error: null,
};

// Create the slice
const profileSlice = createSlice({
    name: 'manageProfile',
    initialState,
    reducers: {
        // Declare and define a reducer for when the profile page is loaded
        profileRequest: (state) => {
            state.loading = true;
        },
        // Declare and define a reducer to control a user's email (retrieval and updating)
        profileEmail: (state, action) => {
            state.email = action.payload;
        },
        // Declare and define a reducer to control a user's zipcode (retrieval and updating)
        profileZip: (state, action) => {
            state.zip = action.payload;
        },
        // Declare and define a reducer to control a user's birthday (retrieval and updating)
        profileBDay: (state, action) => {
            state.bday = action.payload;
        },
        // Declare and define a reducer to control a user's phone number (retrieval and updating)
        profilePhone: (state, action) => {
            state.phone = action.payload;
        },
        // Declare and define a reducer to control a user's avatar (retrieval and updating)
        profileAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        // Declare and define a reducer to control a user's password (updating only)
        profilePassword: (state, action) => {
            state.password = action.payload;
        },
        // Declare and define a reducer for when a user is unsuccessfully logged in
        profileFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export the reducers
export const {
    profileRequest,
    profileEmail,
    profileZip,
    profileBDay,
    profilePhone,
    profileAvatar,
    profilePassword,
    profileFailure,
} = profileSlice.actions;

export default profileSlice;