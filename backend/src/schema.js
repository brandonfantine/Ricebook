const mongoose = require('mongoose');

// Create schema for user information
const userSchema = new mongoose.Schema({
    googleID: Number,
    username: String,
    hash: String,
    salt: String,
});

// Create schema for profile information
const profileSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    dob: Date,
    zipcode: Number,
    headline: String,
    following: [String],
    avatar: String,
});

// Create a schema for comment(s) information
const commentSchema = new mongoose.Schema({
    cid: Number,
    author: String,
    text: String,
});

// Create schema for article information
const articleSchema = new mongoose.Schema({
    pid: Number,
    author: String,
    title: String,
    text: String,
    date: Date,
    image: String,
    comments: [commentSchema],
})

module.exports = {
    userSchema: userSchema,
    profileSchema: profileSchema,
    commentSchema: commentSchema,
    articleSchema: articleSchema,
}