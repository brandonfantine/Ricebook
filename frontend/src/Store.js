// Import all packages related to React-Redux, including all slices
import { configureStore } from '@reduxjs/toolkit';
import registrationSlice from './slices/RegistrationSlice';
import loginSlice from './slices/LoginSlice';
import followingSlice from './slices/FollowingSlice';
import profileSlice from './slices/ProfileSlice';
import postSlice from './slices/PostSlice';
import headlineSlice from './slices/HeadlineSlice';
import searchSlice from './slices/SearchSlice';

// Initalize the Redux store
const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    login: loginSlice.reducer,
    following: followingSlice.reducer,
    profile: profileSlice.reducer,
    posts: postSlice.reducer,
    headline: headlineSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
