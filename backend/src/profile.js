// Retrive schemas from mongo.js
const { profile } = require('./mongo');

// Function to retrieve a user's email address
async function getEmail(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // If the user exists, retreive thier information
    if (foundUser) {
        res.send({ username: foundUser.username, email: foundUser.email });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }

};

// Function to update the logged in user's email
async function updateEmail(req, res) {

    // Identify user's personal account
    const personalAccount = await profile.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the email address for the logged-in user
        personalAccount.email = req.body.email;
        personalAccount.save();

        res.send({ username: personalAccount.username, email: personalAccount.email });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to retrieve a user's zipcode
async function getZip(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // If the user exists, retreive thier information
    if (foundUser) {
        res.send({ username: foundUser.username, zipcode: foundUser.zipcode });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to update the logged in user's zipcode
async function updateZip(req, res) {

    // Identify user's personal account
    const personalAccount = await profile.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the email address for the logged-in user
        personalAccount.zipcode = req.body.zipcode;
        personalAccount.save();

        res.send({ username: personalAccount.username, zipcode: personalAccount.zipcode });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to retrieve a user's birthday
async function getBDay(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // If the user exists, retreive thier information
    if (foundUser) {
        res.send({ username: foundUser.username, dob: foundUser.dob });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to retrieve a user's phone number
async function getPhone(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // Find the information for the logged in user or specified user
    if (foundUser) {
        res.send({ username: foundUser.username, phone: foundUser.phone });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to update the logged in user's phone number
async function updatePhone(req, res) {

    // Identify user's personal account
    const personalAccount = await profile.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the new phone number for the logged-in user
        personalAccount.phone = req.body.phone;
        personalAccount.save();

        res.send({ username: personalAccount.username, phone: personalAccount.phone });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to retrieve a user's profile photo
async function getProfilePhoto(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // If the user exists, retreive thier information
    if (foundUser) {
        res.send({ username: foundUser.username, avatar: foundUser.avatar });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to update the logged-in user's profile photo
async function updateProfilePhoto(req, res) {

    // Identify user's personal account
    const personalAccount = await profile.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the new profile photo (avatar) for the logged-in user
        personalAccount.avatar = req.body.avatar;
        personalAccount.save();

        res.send({ username: personalAccount.username, avatar: personalAccount.avatar });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to get a user's headline
async function getHeadline(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    // If the user exists, retreive thier information
    if (foundUser) {
        res.send({ username: foundUser.username, headline: foundUser.headline });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};

// Function to update the logged in user's headline
async function updateHeadline(req, res) {

    // Identify user's personal account
    const personalAccount = await profile.findOne({ username: req.username });

    if (personalAccount) {

        // Update and save the new profile photo (avatar) for the logged-in user
        personalAccount.headline = req.body.headline;
        personalAccount.save();

        res.send({ username: personalAccount.username, headline: personalAccount.headline });
    }

    else {
        res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
};


module.exports = (app) => {
    // Email retrival endpoint
    app.get('/email/:user?', getEmail);

    // Update email endpoint
    app.put('/email', updateEmail);

    // Zipcode retrival endpoint
    app.get('/zipcode/:user?', getZip);

    // Update zipcode endpoint
    app.put('/zipcode', updateZip);

    // Birthday retrival endpoint
    app.get('/dob/:user?', getBDay);

    // Phone retrival endpoint
    app.get('/phone/:user?', getPhone);

    // Update phone number endpoint
    app.put('/phone', updatePhone);

    // Avatar retrival endpoint
    app.get('/avatar/:user?', getProfilePhoto);

    // Avatar update endpoint
    app.put('/avatar', updateProfilePhoto);

    // Headline endpoint
    app.get('/headline/:user?', getHeadline);

    // Update headline endpoint
    app.put('/headline', updateHeadline);
}