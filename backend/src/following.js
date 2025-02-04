// Retrive profile schema from mongo.js
const { profile } = require('./mongo');

// Function to retrive the list of followed users
async function getFollowing(req, res) {
    // If no username is found, use the logged in user's
    let username = req.username;

    if (req.params.user) {
        username = req.params.user
    }

    // Find the information for the logged in user or specified user
    const foundUser = await profile.findOne({ username: username });

    if (foundUser) {
      res.send({ username: foundUser.username, following: foundUser.following });
    }

    else {
      res.status(404).json({ result: 'failure', error: 'User not found' }).send();
    }
  };

// Function to follow a user
async function follow(req, res) {

  // Find the user to follow
  const userToFollow = await profile.findOne({ username: req.params.user });

  // Isolate user's personal account
  const personalAccount = await profile.findOne({ username: req.username });

  if (userToFollow !== undefined) {

    // Add the specified user to the following list of the logged-in user
    if (!personalAccount.following.includes(userToFollow.username)) {
      personalAccount.following.push(userToFollow.username);
      personalAccount.save();
    }

    res.send({ username: personalAccount.username, following: personalAccount.following });
  }

  else {
    res.status(404).json({ result: 'failure', error: 'User does not exist' }).send();
  }
};

// Function to unfollow a user
async function unfollow(req, res) {

  // Find the user to follow
  const userToUnfollow = await profile.findOne({ username: req.params.user });

  // Isolate user's personal account
  const personalAccount = await profile.findOne({ username: req.username });

  if (userToUnfollow !== undefined) {

    // Remove the specified user from the following list of the logged-in user
    personalAccount.following = personalAccount.following.filter(followedUser => followedUser !== userToUnfollow.username);
    personalAccount.save();

    res.send({ username: personalAccount.username, following: personalAccount.following });
  }

  else {
    res.status(404).json({ result: 'failure', error: 'User does not exist' }).send();
  }
};

module.exports = (app) => {
  // Following list retrival endpoint
  app.get('/following/:user?', getFollowing);

  // Following a user endpoint  
  app.put('/following/:user', follow);

  // Unfollowing a user endpoint
  app.delete('/following/:user', unfollow);

}