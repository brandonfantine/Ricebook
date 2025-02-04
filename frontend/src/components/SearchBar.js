// Import all related React and Redux packages
import { useState } from "react";

import {
    loadPosts,
} from '../slices/PostSlice';

import {
    loadSearchBar,
    searchQuery,
    searchResults,
} from '../slices/SearchSlice'

// Import the useDispatch hook
import { useDispatch } from 'react-redux';

// Import AXIOS
import AXIOS from '../Axios';

export default function SearchBar() {

    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define the react hook to manage the search query
    const [query, setQuery] = useState('');

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
    }

    return (
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
    )
}