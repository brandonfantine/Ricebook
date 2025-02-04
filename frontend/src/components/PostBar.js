import { useState, useRef } from "react";

import CenterContainer from "./CenterContainer";

import {
    writePost,
    editFailure,
} from '../slices/PostSlice'

import AXIOS from "../Axios";

// Import the useDispatch and useSelector hooks
import { useDispatch } from 'react-redux';

export default function PostBar() {

    // Declare and define a variable to refer to the current user
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define all react hooks for the data stored within the MongoDB database
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    // Function to clear react hooks/inputs
    const clearPost = (e) => {
        e.preventDefault();
        setPostTitle('');
        setPostBody('');
    }


    // Asynchronous function to deal with adding a new follower
    const writeNewPost = async (e) => {
        e.preventDefault();

        // Try-catch block to identify if the backend nets any authorization errors
        try {
            // Await a fetch response to the backend API
            const responseNewPost = await AXIOS.post('/article',
                // Requirement body information for the backend 
                {
                    author: loggedInUser,
                    title: postTitle,
                    text: postBody,
                    image: image,
                },

                // Establish the application header
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                },);

            // Communicate with the backend to remove a follower
            dispatch(writePost(await responseNewPost.data));

            clearPost(e);
        }
        // If a error is caught in the backend, do the following:
        catch (error) {
            dispatch(editFailure(error.message));
        };
    };

    // Function to open the file picker
    const pickFile = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            console.log("fileType", fileType);

            setImage(files[0]);
        }
    }

    // Function to upload an image
    const uploadImage = () => { inputFile.current.click() };


    return (
        <div className="post-bar">
            <CenterContainer>
                <div className="write-post">
                    <h1 className="post-title status-name">Write a Post</h1>
                    <br />
                    <form action="">
                        <br />
                        <input
                            className="enter-status"
                            type="text"
                            onChange={(e) => setPostTitle(e.target.value)}
                            value={postTitle}
                            placeholder="Post Title"
                        />
                        <br />
                        <br />
                        <textarea
                            className="enter-status post-caption"
                            type="text"
                            onChange={(e) => setPostBody(e.target.value)}
                            value={postBody}
                            placeholder="Write A Caption"
                        />
                        <br />
                        <br />
                        <div>
                            <input type='file' ref={inputFile} onChange={pickFile} style={{ display: "none" }}></input>
                            <div className="image-upload" onClick={uploadImage}>Upload an Image</div>
                        </div>
                        <br />
                        <button className='action post-button' onClick={writeNewPost}>Post</button>
                        <button className='action post-comment' onClick={clearPost}>Cancel</button>
                    </form>
                </div>
            </CenterContainer>
        </div>
    )
}