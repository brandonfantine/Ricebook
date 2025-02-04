// Import all related React and Redux packages
import { useState, useEffect } from "react";
import {
    loadFollowers,
    errorFollowers,
    manageFollowers,
} from '../slices/FollowingSlice';

// Import the useDispatch hook
import { useDispatch, useSelector } from 'react-redux';

// Import AXIOS
import AXIOS from '../Axios';

export default function Following() {

    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Retrieve the following state
    const following = (useSelector(state => state.following)).following.following;

    // Declare and define all react hooks for the data stored within the MongoDB database
    const [specifiedUser, setSpecifiedUser] = useState('');

    // Asynchronous function to retrieve a current list of followed (and not followed) users
    useEffect(() => {
        // Identify if the list of followers has been loaded
        dispatch(loadFollowers());

        const retrieveUserFollowing = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's headline/status
            const responseFollowers = await AXIOS.get('/following');

            // Dispatch Redux commands to actions in the global store
            dispatch(manageFollowers(await responseFollowers.data));
        };

        retrieveUserFollowing();
    }, [dispatch]);



    // Asynchronous function to deal with adding a new follower
    const AddFollower = async (user) => {

        // Try-catch block to identify if the backend nets any authorization errors
        try {
            // Await a fetch response to the backend API
            const responseAdd = await AXIOS.put(`/following/${encodeURIComponent(user)}`);

            // Communicate with the backend to remove a follower
            dispatch(manageFollowers(await responseAdd.data));
        }
        // If a error is caught in the backend, do the following:
        catch (error) {
            dispatch(errorFollowers(error.message));
        };
    };

    // Asynchronous function to deal with the removal of a follower
    const RemoveFollower = async (user) => {

        // Try-catch block to identify if the backend nets any authorization errors
        try {
            // Await a fetch response to the backend API
            const responseRemove = await AXIOS.delete(`/following/${encodeURIComponent(user)}`);

            // Communicate with the backend to remove a follower
            dispatch(manageFollowers(await responseRemove.data));
        }
        // If a error is caught in the backend, do the following:
        catch (error) {
            dispatch(errorFollowers(error.message));
        };
    };

    return (
        <div className='friends-bar'>
            {/* Display the profiles of users that are currently followed */}
            <br /><br /><br />
            <h2>Friends</h2>
            <br /><br />

            {/* Construct a map of followed users for iteration purposes */}
            {following ? (
            following.map((friend, index) => (
                    <div className="friend-item" key={index}>
                        {/* <img src={followedAvatars[friend]} className="friend-img" /> */}
                        <p className="friend-name">{friend}</p>

                        {/* Construct a button that calls the function to stop following a user (unfollow) and update the array of recommend accounts */}
                        <button name="Unfollow" className='action-small' onClick={() => { RemoveFollower(friend) }}> Unfollow </button>
                    </div>
                )
            )) : (<p> Loading... </p>)}

            {/* Display the profiles of users are *not* currently followed */}
            <br /><br />
            <h2>Follow a User</h2>

            {/* Construct a form to add a user to the list of following */}
            <form action="" className="set-status">
                <br />
                <input
                    className="enter-status"
                    id='userToFollow'
                    type="text"
                    onChange={(e) => setSpecifiedUser(e.target.value)}
                    placeholder="Enter a Username"
                />
            </form>
            {/* Construct a button that calls the function to follow a user and update the array of recommend accounts */}
            <button name="Follow" className='action-small' onClick={() => { AddFollower(specifiedUser); document.getElementById('userToFollow').value = '' }}> Follow </button>
        </div>
    )
}
