// Retrive schemas from mongo.js
const { article, comments } = require('./mongo');

// Function to search through posts
async function filterPosts(req, res) {
    const { search } = req.params;

    if (search) {
        // Filter posts by author or post id
        const filteredPosts = await article.find({ author: req.username }) || article.findOne({ pid: req.params.id })

        return res.send({ articles: filteredPosts });
    } else {
        // If no search parameters specified, return the logged in user's published articles
        const userPosts = await article.find({ author: req.username });

        return res.send({ articles: userPosts });
    }
};
// Function to allow the editing of posts
async function updatePost(req, res) {

    // Find post to edit
    const editablePost = await article.findOne({ pid: req.params.id });

    // Find comment to edit
    const editableComment = editablePost.comments.filter(cid => cid === req.body.commentId);

    // If the post to edit DNE, return a status error
    if (editablePost === undefined) {
        return res.status(404).json({ result: 'failure', error: 'Article not found' }).send();
    }

    // If the post is not owned by the logged in user, DNE
    if (editablePost.author !== req.username) {
        return res.status(403).json({ result: 'failure', error: 'Forbidden: You do not own this article' }).send();
    }

    // If commentId is not supplied, update the article content
    if (req.body.commentId === undefined) {

        // Edit and save the body of the post
        editablePost.text = req.body.text;
        editablePost.save();

        return res.send({ articles: [editablePost], comments: [editablePost.comments] });
    }

    // If the comment to edit DNE, write and upload a new comment
    if (editableComment === undefined) {

        // Write a new comment
        const newComment = { cid: editablePost.comments.length + 1, author: req.username, text: text };

        // Push the new comment to the array of comments associated with this article
        editablePost.comments.push(newComment);
        editablePost.save();

        return res.send({ articles: [editablePost], comments: [editablePost.comments] });
    }

    // If commentId points to an existing comment, update it
    else {

        if (editableComment.author !== req.username) {
            return res.status(403).json({ result: 'failure', error: 'Forbidden: You do not own this comment' }).send();
        }

        else {

            // Edit and save the body of the comment
            editableComment.text = req.body.text;
            editableComment.save();

            // Save the updated instance of editablePost
            editablePost.save();

            return res.send({ articles: [editablePost], comments: [editableComment] });
        }
    }
};

// Function to upload a new post
function writePost(req, res) {

    // Generate new object with a unique post ID and the logged-in user as the author
    new article({
        pid: Date.now(),
        author: req.username,
        title: req.body.title,
        text: req.body.text,
        date: new Date(),
        comments: [],
    }).save();

    res.send({ articles: [article] });
};

module.exports = (app) => {
    // Post search endpoint
    app.get('/articles/:id?', filterPosts);

    // New post upload endpoint
    app.post('/article', writePost);

    // Edit post endpoint
    app.put('/articles/:id', updatePost);
}