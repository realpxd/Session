const mongoose = require('mongoose');

// Define the user schema
const postsSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3
    },
    fullname: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        minlength: 3
    },
    postData: {
        type: String
    },
    image: {
        type: String
    },
    likes: {
        type: Number,
        default: 0,
        minlength: 0
    },
    comments: {
        type: Number,
        minlength: 0
    },
    reposts: {
        type: Number,
        minlength: 0
    },
    likedBy: {
        type: Array,
        minlength: 0
    },


}, {
    timestamps: true,

})


// Define the model or collection name
const Posts = new mongoose.model('Posts', postsSchema);

// Export the Posts model
module.exports = Posts;
