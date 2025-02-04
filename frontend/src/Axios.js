// Import AXIOS
import axios from 'axios';

// Construct an instance of an AXIOS object with the base url as the frontend port
const AXIOS = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
});

export default AXIOS;
