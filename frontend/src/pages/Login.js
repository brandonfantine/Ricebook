// Import all related React and Redux packages
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from '../slices/LoginSlice';

// Import AXIOS
import AXIOS from '../Axios';

// Import the useDispatch hook
import { useDispatch } from 'react-redux';

export default function Login() {

  // Declare and define the naviagte router
  const navigate = useNavigate();

  // Declare and define the dispatch hook
  const dispatch = useDispatch();

  // Declare and define all react hooks for the data stored within the MongoDB database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Construct the Logo as seen on the lefthand side of the page
  const logo = {
    backgroundImage: `url('/assets/fakeTwitter.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "50%",
    height: "100%"
  }

  const LoginUser = async (e) => {
    e.preventDefault();

    // Try-catch block to identify if the backend nets any authorization errors
    try {
      // Identify if the login page has been loaded
      dispatch(loginRequest());

      // Await a fetch response to the backend API
      const response = await AXIOS.post('/login',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        },
      );

      // Dispatch a successful user creation with the fetch response data
      dispatch(loginSuccess(response.data));

      // Store user information in sessionStorage
      sessionStorage.setItem('loggedInUser', username);

      // Navigate the user to the homepage
      navigate("/Main");
    }
    // If a error is caught in the backend, do the following:
    catch (error) {
      dispatch(loginFailure(error.message));
    };
  };

  // HTML for the user registration form
  return (
    <div>
      <div className="login-container">
        <div className="logo" style={logo}></div>
        <div className="form-container">
          <form action="" className="login-form">
            {/* Input field for the user's username */}
            <h1>Log In</h1>
            <br />
            <br />
            <input
              className="login-input"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            {/* Input field for the user's password */}
            <br />
            <input
              className="login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <br />
            {/* Submit button that runs the LoginUser function to communicate with the Redux store and the backend API */}
            <button name='login' className="form-submit action-medium" type="submit" onClick={LoginUser}>Sign In</button>

            {/* Text that reroutes a new user to the navigation page */}
            <p onClick={() => navigate('/Registration')}>Make a New Account</p>
          </form>
        </div>
      </div>
    </div>
  );
}
