const Posts = require('../../models/Posts.js');

const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = getPosts;