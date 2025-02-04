// Import all related React and Redux packages
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
} from '../slices/RegistrationSlice';

// Import the useDispatch and useSelector hooks
import { useDispatch, useSelector } from 'react-redux';

// Import AXIOS
import AXIOS from '../Axios';

export default function RegistrationPage() {

    // Declare and define the naviagte router
    const navigate = useNavigate();

    // Declare and define the dispatch hook
    const dispatch = useDispatch();

    // Declare and define the selector hook to retrieve an error message (if it exists)
    const backendError = useSelector(state => state.registration.error);

    // Declare and define the minimum birthday of a user in milliseconds
    const minBDay = new Date().getTime() - 568025136000;

    // Declare and define all react hooks for the data stored within the MongoDB database
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Declare and define a react hook to validate the user's password
    const [confirmPass, setConfirmPass] = useState('');


    const RegisterNewUser = async (e) => {
        e.preventDefault();

        // If the password and confirmation password fields are the same, do the following:
        if (password === confirmPass) {
            // If the user is over 18, do the following:
            if (new Date(dob).getTime() <= minBDay) {
                // Try-catch block to identify if the backend nets any authorization errors
                try {
                    // Identify if the registration page has been loaded
                    dispatch(createUserRequest());

                    // Await an AXIOS response to the backend API
                    const response = await AXIOS.post('/register',
                        // Requirement body information for the backend 
                        {
                            username: username,
                            email: email,
                            phone: phone,
                            dob: dob,
                            zipcode: zipcode,
                            password: password
                        },

                        // Establish the application header
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            }
                        },
                    );

                    // Dispatch a successful user creation with the AXIOS response data
                    dispatch(createUserSuccess(response.data));

                    // Navigate to the homepage
                    navigate("/Main");
                }
                // If a error is caught in the backend, do the following:
                catch (error) {
                    if (error.response) {
                        dispatch(createUserFailure(error.response.data));
                        setErrorMessage(backendError);
                    }
                }
            }
            else {
                setErrorMessage("Must be over the age of 18 to Register.")
            };
        }
        // Otherwise, do the following:
        else {
            // Display a custom error message
            setErrorMessage("Passowrds don't match.");
        };
    };

    // HTML for the user registration form
    return (
        <div className='update-profile'>
            <h1 className='update-header'>Create a new Profile</h1>
            <form className='update-profile'>
                {/* Input field for the user's username */}
                <input className='update-input' type='text' id='username' name='username' onChange={(e) => setUsername(e.target.value)} placeholder="Unique Username"></input>
                <br />

                {/* Input field for the user's email */}
                <input className='update-input' type='text' id='email' name='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                <br />

                {/* Input field for the user's zipcode (for location purposes) */}
                <input className='update-input' type='text' id='zipcode' name='zipcode' pattern='([0-9]).{4}' onChange={(e) => setZipcode(e.target.value)} placeholder="Zipcode"></input>
                <br />

                {/* Input field for the user's phone number */}
                <input className='update-input' type='tel' id='phone' name='phone' onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number"></input>
                <br />

                {/* Input field for the user's birthday) */}
                <input className='update-input' type='date' id='birthday' name='birthday' onChange={(e) => setDob(e.target.value)} placeholder="Birthday"></input>
                <br />

                {/* Input field for the user's profile password */}
                <input className='update-input' type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                <br />

                {/* Input field to confirm the user's profile via re-entry */}
                <input className='update-input' type="password" id="confirmPass" name="confirmPass" onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password"></input>
                <br />

                {/* Error Message for user's */}
                <br />
                <p>{errorMessage}</p>
                <br />

                {/* Submit button that runs the RegisterNewUser function to communicate with the Redux store and the backend API */}
                <button className="form-submit action-medium" id="submit" onClick={RegisterNewUser}>Register New User</button>
            </form>
        </div>
    );
};