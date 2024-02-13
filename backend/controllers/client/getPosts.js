const Posts = require('../../models/Posts.js');

const getPosts = async (req, res) => {
    const { username, postData, email } = req.body;
    try {
        if (username) {
            const posts = await Posts.find({ username });
            res.status(200).json(posts);
        }else{
            const posts = await Posts.find();
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = getPosts;