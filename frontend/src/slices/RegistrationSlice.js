import { createSlice } from '@reduxjs/toolkit';

// Declare the inital state for a new registered user
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Create the slice
const registrationSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    // Declare and define a reducer for when the registration page is loaded
    createUserRequest: (state) => {
      state.loading = true;
    },
    // Declare and define a reducer for when a user is successfully created
    createUserSuccess: (state, action) => {
      state.user = action.payload;
    },
    // Declare and define a reducer for when a user is unsuccessfully created
    // This includes, but is not limited to: an age under 18, non-matching passwords, and not all fields filled in
    createUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export the reducers
export const {
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} = registrationSlice.actions;

export default registrationSlice;
