import CenterContainer from '../components/CenterContainer';
import Menu from "../components/Menu.js";

// Import all related React and Redux packages
import { useState, useEffect, useRef } from "react";
import {
    profileRequest,
    profileEmail,
    profileZip,
    profileBDay,
    profilePhone,
    profileAvatar,
    profileFailure,
} from '../slices/ProfileSlice.js'

// Import the useDispatch hook
import { useDispatch, useSelector } from 'react-redux';

// Import AXIOS
import AXIOS from '../Axios';

export default function ProfilePage() {

    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define a variable to refer to the current user
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // Retrieve the profile state
    const profileState = useSelector(state => state.profile);

    // Declare and define all react hooks for the data stored within the MongoDB database
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [bDay, setBDay] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateFail, setUpdateFail] = useState('');
    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    // Use effect hook to retrieve all user information from the MongoDB database
    useEffect(() => {
        // Identify if the profile page has been loaded
        dispatch(profileRequest());

        const retrieveUserEmail = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's email
            const responseEmail = await AXIOS.get('/email');

            // Dispatch Redux commands to actions in the global store
            dispatch(profileEmail(await responseEmail.data));
        };

        const retrieveUserZip = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's zipcode
            const responseZip = await AXIOS.get('/zipcode');

            // Dispatch Redux commands to actions in the global store
            dispatch(profileZip(await responseZip.data));
        };

        const retrieveUserBDay = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's birthday
            const responseBDay = await AXIOS.get('/dob');

            // Dispatch Redux commands to actions in the global store
            dispatch(profileBDay(await responseBDay.data));
        };

        const retrieveUserPhone = async () => {
            // Await an AXIOS responses to the backend API to retrieve user's phone number
            const responsePhone = await AXIOS.get('/phone');

            // Dispatch Redux commands to actions in the global store
            dispatch(profilePhone(await responsePhone.data));
        };


        retrieveUserEmail();
        retrieveUserZip();
        retrieveUserBDay();
        retrieveUserPhone();
    }, [email, zip, bDay, phone]);


    // Asynchronous function to update a user's information
    const updateInformaion = async (e) => {
        e.preventDefault();

        // Declare and define a variable to keep track of if any variable was updated
        let updated = false;

        // Identify the email as being changed 
        if (email.length > 0) {
            // Await an AXIOS responses to the backend API to update a user's email
            const responseEmail = await AXIOS.put('/email',

                // Requirement body information for the backend 
                {
                    email: email,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch(profileEmail(await responseEmail.data));

            // Indentify the uer information as having changed
            updated = true;
        };

        // Identify the zipcode as being changed
        if (zip.length > 0) {
            // Await an AXIOS responses to the backend API to update a user's zipcode
            const responseZip = await AXIOS.put('/zipcode',

                // Requirement body information for the backend 
                {
                    zipcode: zip,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch(profileZip(await responseZip.data));

            // Indentify the uer information as having changed
            updated = true;
        };

        // Identify the birthday as being changed
        if (bDay.length > 0) {
            // Await an AXIOS responses to the backend API to update a user's birthday
            const responseBDay = await AXIOS.put('/dob',

                // Requirement body information for the backend 
                {
                    dob: bDay,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch(profileBDay(await responseBDay.data));

            // Indentify the uer information as having changed
            updated = true;
        };

        // Identify the phone number as being changed
        if (phone.length > 0) {
            // Await an AXIOS responses to the backend API to update a user's phone number
            const responsePhone = await AXIOS.put('/phone',

                // Requirement body information for the backend 
                {
                    phone: phone,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch(profilePhone(await responsePhone.data));

            // Indentify the uer information as having changed
            updated = true;
        };

        if (newPassword.length > 0 && newPassword === confirmPassword) {
            // Await an AXIOS responses to the backend API to update the user's password
            const responsePassword = await AXIOS.put('/password',

                // Requirement body information for the backend 
                {
                    password: newPassword,
                },
            );

            // Dispatch Redux commands to actions in the global store
            dispatch((await responsePassword.data));

            // Indentify the uer information as having changed
            updated = true;

        }

        // Await an AXIOS responses to the backend API to update the user's password
        const responseAvatar = await AXIOS.put('/avatar',

            // Requirement body information for the backend 
            {
                avatar: image,
            },
        );

        // Dispatch Redux commands to actions in the global store
        dispatch((await responseAvatar.data));

        // Indentify the uer information as having changed
        updated = true;

        // Clear the input fields
        if (updated) {
            setEmail('');
            setZip('');
            setBDay('');
            setPhone('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }



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

    // Wrtie the style information for the profile Container
    const profileContainerStyle = {
        width: "10vw",
        height: "10vw",
        border: "1px solid #262626",
        borderRadius: "10px",
    }

    // Write the style information for the user's avatar displayed on the profile page
    const userPhotoStyle = {
        minWidth: "100%",
        maxHeight: "100%",
        objectFit: "cover",
        borderRadius: "10px"
    }


    return (
        <div>
            <Menu />
            <CenterContainer width="60%">
                <div className='profile-info'>
                    <h1 className='profile-header'>Your Profile:</h1>
                    <div style={profileContainerStyle}>
                        <img src='/assets/defaultUser.jpg' alt="user-photo" style={userPhotoStyle} />
                    </div>
                    <p>Username: {loggedInUser}</p>
                    <p>Email: {profileState.email.email}</p>
                    <p>Zipcode: {profileState.zip.zipcode}</p>
                    <p>Phone: {profileState.phone.phone}</p>
                    <p>Birthday: {profileState.bday.dob}</p>
                </div>
                <div className='profile-update'>
                    <form className='update-profile'>

                        {/* Input field for a new email */}
                        <label htmlFor='Email'>Email:</label>
                        <input
                            className='update-input'
                            type='text'
                            id='email'
                            name='email'
                            pattern='[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z]{2,}$'
                            title="Please enter a valid email address."
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>

                        <br />

                        {/* Input field for a new zipcode */}
                        <label htmlFor='Zipcode'>Zipcode:</label>
                        <input
                            className='update-input'
                            type='text'
                            id='zipcode'
                            name='zipcode'
                            pattern='([0-9]).{4}'
                            onChange={(e) => setZip(e.target.value)}>
                        </input>

                        <br />

                        {/* Input field for a new phone number */}
                        <label htmlFor='Phone'>Phone Number:</label>
                        <input
                            className='update-input'
                            type='tel'
                            id='phone'
                            name='phone'
                            onChange={(e) => setPhone(e.target.value)}>
                        </input>

                        <br />

                        {/* Input field for a new password */}
                        <label htmlFor='Password'>Password:</label>
                        <input
                            className='update-input'
                            class='key'
                            id='password'
                            name='password'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"
                            onChange={(e) => setNewPassword(e.target.value)}>
                        </input>

                        <br />

                        {/* Confirmation field for a new password */}
                        <label htmlFor='oldPass'>Confirm Password:</label>
                        <input
                            className='update-input'
                            type='password'
                            id='oldPassword'
                            name='oldPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                        <br />
                        <div>
                            <input type='file' ref={inputFile} onChange={pickFile} style={{ display: "none" }}></input>
                            <div className="image-upload" onClick={uploadImage}>Upload an Image</div>
                        </div>
                        <br />
                        <p className="updateFail">{updateFail}</p>
                        <br></br>
                        <button className="form-submit action-medium" type="submit" id="submit" onClick={updateInformaion}>Update User Information</button>
                    </form>
                </div>
            </CenterContainer>
        </div>
    );

}