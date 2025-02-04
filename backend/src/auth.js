// Retrive schemas from mongo.js and encryption tool
const { user, profile } = require('./mongo');
const bcryptjs = require('bcryptjs');

// Declare a secret variable for encryption purposes
const secret = process.env.SECRET || Date.now().toString();

// Declare variables such that we can store a session key cookie for middleware.js
const sessionUser = {};
const cookieKey = 'SessionId';

// Middleware function to check if a user is logged in
async function isLoggedIn(req, res, next) {

    // If there is nothing stored in cookies (ie. a user is not logged in), throw error message
    if (!req.cookies) {
        res.status(401).json({ result: 'failure', error: 'User not logged in' }).send();
    }

    else {
        // Get the username of the logged in user using the stored sessionKey cookie
        if (!(req.cookies[cookieKey] in sessionUser))
            return res.sendStatus(401);
        req.username = sessionUser[req.cookies[cookieKey]];
        return next();
    }
}

// Function to log into the site
async function login(req, res) {

    // Check for input username and password 
    if (!req.body.username || !req.body.password) {
        return res.status(401).json({ result: 'failure', error: 'Please enter in a username and password' }).send();
    }

    // Get user information from MongoDB
    const mongoUser = await user.findOne({ username: req.body.username });

    // Check if the user exists in the MongoDB database
    if (!mongoUser) {
        return res.status(401).json({ result: 'failure', error: 'Please enter in a valid username and password' }).send();
    }

    // Generate a hashed user password
    const hashedPassword = await saltedHashcode(req.body.password, mongoUser.salt);

    // Check if the hashed password is consistent with the database
    if (hashedPassword !== mongoUser.hash) {
        return res.status(401).json({ result: 'failure', error: 'Please enter in a valid username and password' }).send();
    }

    // Define and declare the session key
    const sessionKey = secret + Date.now().toString() + await bcryptjs.hash("bageruretkfmadpain", mongoUser.salt);

    // Set a session user object
    sessionUser[sessionKey] = req.body.username;

    // Set a session cookie
    res.cookie(cookieKey, sessionKey, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true });

    res.send({ username: req.body.username, result: 'success' });

};

// Function to logout of the site
async function logout(req, res) {

    // Clear the cookie cache to remove the key 
    delete sessionUser[req.cookies['sessionKey']];

    res.send('OK');

};

// Function to register a new user
async function newUser(req, res) {

    // Verify all fields have been filled out 
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.dob || !req.body.phone || !req.body.zipcode) {
        return res.status(400).send('All fields are required');
    }

    // Verify username is unique
    const notUniqueUser = await user.findOne({ username: req.body.username });
    if (notUniqueUser) {
        return res.status(400).send('Username is already taken');
    }

    // Generate a new salt and hash for the user profile
    const salt = await bcryptjs.genSalt(10);
    const hash = await saltedHashcode(req.body.password, salt);

    // Create a new user
    const newUser = await new user({
        username: req.body.username,
        hash: hash,
        salt: salt,
    }).save();

    // Create a new profile
    const newProfile = await new profile({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        zipcode: req.body.zipcode,
        headline: 'COMP 431 Dummy Data',
        following: [],
        avatar: "data:image/jpeg;base64,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"
    }).save();

    // Define and declare a new session key
    const newSessionKey = secret + Date.now.toString() + hash;

    // Set a session user object
    sessionUser[newSessionKey] = req.body.username;

    // Set a session cookie
    res.cookie(cookieKey, newSessionKey, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true });

    res.send({ username: req.body.username, result: 'success' });

};

// Function to update logged in user's password
async function updatePassword(req, res) {

    // Identify user's personal account
    const personalAccount = await user.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the email address for the logged-in user
        personalAccount.hash = saltedHashcode(req.body.password, personalAccount.salt);
        personalAccount.save();

        res.send({ username: personalAccount.username, result: 'success' });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to retrive hashcode for a salted password
async function saltedHashcode(password, salt) {
    return await bcryptjs.hash(password, salt);
}

module.exports = (app) => {
    // Login endpoint
    app.post('/login', login);

    // Registration Page endpoint
    app.post('/register', newUser);

    app.use(isLoggedIn);

    // Logout endpoint
    app.put('/logout', logout);

    // Update password endpoint
    app.put('/password', updatePassword);
}
