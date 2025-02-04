
import CenterContainer from "./CenterContainer";
import Following from "./Following.js"

// Import all related React and Redux packages
import { useState, useEffect } from "react";
import {
    loadHeadline,
    manageHeadline,
    updateFailure,
} from '../slices/HeadlineSlice.js'

// Import the useDispatch hook
import { useDispatch, useSelector } from 'react-redux';

// Import AXIOS
import AXIOS from '../Axios';

export default function StatusBar(props) {
    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define a variable to refer to the current user
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Retrieve the profile state
    const headlineState = useSelector(state => state.headline);

    // Declare and define a variable to keep track of if any variable was updated
    let updated = false;

    // Declare and define a react hook to manage the headline/status    
    const [status, setStatus] = useState('');

    // Use effect hook to retrieve user's headline from the MongoDB database
    useEffect(() => {
        // Identify if the headline has been loaded
        dispatch(loadHeadline());

        const retrieveUserHeadline = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's headline/status
            const responseHeadline = await AXIOS.get('/headline');

            // Dispatch Redux commands to actions in the global store
            dispatch(manageHeadline(await responseHeadline.data));
        };

        retrieveUserHeadline();
    }, [status]);

    // Asynchronous function to update a user's information
    const updateStatus = async (e) => {
        e.preventDefault();

        // Identify the email as being changed 
        if (status.length > 0) {
            // Await an AXIOS responses to the backend API to update a user's email
            const responseUpdateHeadline = await AXIOS.put('/headline',

                // Requirement body information for the backend 
                {
                    headline: status,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch(manageHeadline(await responseUpdateHeadline.data));

            // Indentify the uer information as having changed
            setStatus('');
        };
    };

    if(updated){
        setStatus('');
    }

        const profileContainerStyle = {
            width: "10vw",
            height: "10vw",
            border: "1px solid #262626",
            borderRadius: "10px",
        }

        const userPhotoStyle = {
            minWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            borderRadius: "10px"
        }

        return (
            <div className="status-bar">
                <CenterContainer>
                    <div className="status">
                        <div style={profileContainerStyle}>
                            <img src='assets/defaultUser.jpg' alt="user-photo" style={userPhotoStyle} />
                        </div>
                        <br />
                        <br />
                        <h1 className="status-name">{loggedInUser}</h1>
                        <br />
                        <br />
                        <h2 className='status-value'>My Status:</h2>
                        <br />
                        <p className='status-render'>{headlineState.headline.headline}</p>
                        <form action="" className="set-status">
                            <br />
                            <input
                                className="enter-status"
                                type="text"
                                onChange={(e) => setStatus(e.target.value)}
                                placeholder="Enter Status"
                            />
                        </form>
                        <br />
                        <button className="action" onClick={updateStatus}>Update</button>
                        <br />
                        <Following />
                    </div>
                </CenterContainer>
            </div>
        )
    }
