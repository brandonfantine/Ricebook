// Import all related react and redux packages
import React, { useEffect, useState } from 'react';

// Import all the components housed on the mainpage
import Menu from '../components/Menu';
import StatusBar from '../components/StatusBar';
import Post from '../components/Post';
import PostBar from '../components/PostBar';

// Import AXIOS
import AXIOS from '../Axios';

// Import the useDispatch hook
import { useDispatch, useSelector } from 'react-redux';

// Import the proper reducers
import {
    loadPosts,
} from '../slices/PostSlice';

import {
    loadSearchBar,
    searchQuery,
    searchResults,
} from '../slices/SearchSlice'


export default function Main() {
    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define a react hook to manage the user's homepage posts and search query
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');

    // Retrieve the logged in user from session storage
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Retrieve the state of followed users
    const followedUsers = (useSelector(state => state.following)).following.following;

    // Retrieve the search query and search results
    const search = (useSelector(state => state.search));
    const searchQuery = search.search;
    const searchResults = search.posts.articles;

    // Make use of a useEffect hook to manage syncronous/asynchronous calls in a proper order
    useEffect(() => {
        const fetchPosts = async () => {
            // Identify if the main page has been loaded
            dispatch(loadPosts());

            // Declare and define an empty array to house the posts on a user's homepage
            let fetchedPosts = [];

            console.log(fetchedPosts)

            // Fetch user's posts
            const userPostsResponse = await AXIOS.get(`/articles/${encodeURIComponent(loggedInUser)}`);

            if (!fetchedPosts.includes(userPostsResponse.data.articles)) {
                fetchedPosts.push(...userPostsResponse.data.articles);
            }

            console.log(fetchedPosts)


            // Fetch posts of followed users
            if (followedUsers && followedUsers.length > 0) {
                for (var i = 0; i < followedUsers.length; i++) {
                    const friendPostsResponse = await AXIOS.get(`/articles/${encodeURIComponent(followedUsers[i])}`);
                    if (!fetchedPosts.includes(friendPostsResponse.data.articles)) {
                        fetchedPosts.push(...friendPostsResponse.data.articles);
                    }
                };
            };

            setPosts(fetchedPosts);
        };

        fetchPosts();
    }, [followedUsers]);

    // Search through the posts
    const SearchPosts = async (e) => {
        e.preventDefault();

        // Identify if the main page has been loaded
        dispatch(loadPosts());
        dispatch(loadSearchBar());

        // Udpate the search in the Redux store
        dispatch(searchQuery(query));

        // Await an AXIOS response to the backend API
        const response = await AXIOS.get(`/articles/${encodeURIComponent(query)}`);

        // Dispatch the search results with the AXIOS response data
        dispatch(searchResults(response.data));
        return (
            <div>
                <h3 className='posts-message'>Posts with "{searchQuery}"</h3>
                {searchResults.map(post => (
                    <Post role="post" key={post.pid} title={post.title} body={post.text} author={post.author} timestamp={post.date} img={'https://source.unsplash.com/user/c_v_r'} />
                ))}
            </div>
        );

    };

    // Render the user's homepage
    const RenderHomepage = () => (
        <div>
            {posts.map(post => (
                <Post role="post" key={post.pid} title={post.title} body={post.text} author={post.author} timestamp={post.date} img={'https://source.unsplash.com/user/c_v_r'} />
            ))}
        </div>
    );

    return (
        <div className="main">
            <Menu />
            <StatusBar />
            <div className="search-bar">

                {/* Input field for the search query information */}
                <input
                    className="search-box"
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Posts"
                />
                {/* Submit button to handle searching os posts */}
                <button className="action" onClick={SearchPosts}> Search </button>

                {/* Clear button that will make it s.t. the data is not queried */}
                <button className="action" onClick={() => setQuery('')}> Clear </button>
            </div>
            <div className="posts-outer-container">
                {query ? <SearchPosts /> : <RenderHomepage />}
            </div>
            <PostBar />
            <button className='action-top' onClick={() => window.scrollTo(0, 0)}>⬆</button>
        </div>
    );
}