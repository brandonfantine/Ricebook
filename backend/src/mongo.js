const mongoose = require('mongoose');
const { userSchema, profileSchema, commentSchema, articleSchema } = require('./schema');
require('dotenv').config();

// Make a model for the user schema
const User = mongoose.model("User", userSchema);

// Make a model for the profile schema
const Profile = mongoose.model("Profile", profileSchema);

// Make a model for the comment schema
const Comments = mongoose.model("Comments", commentSchema);

// Make a model for the article schema
const Article = mongoose.model("Article", articleSchema);

// Connect to the MongoDB database using mongoose
mongoose.connect(`mongodb+srv://brandonfantine:Password1@comp431backend.focztbj.mongodb.net/?retryWrites=true&w=majority`);

module.exports = {
    user: User,
    profile: Profile,
    comments: Comments,
    article: Article,
}