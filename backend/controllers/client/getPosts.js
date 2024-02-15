const Posts = require('../../models/Posts.js');

const getPosts = async (req, res) => {
    const { username, postData, email , postPageNum = 1, limit = 8 } = req.body;
    try {
        if (username) {
            const posts = await Posts.find({ username })
            .sort({ createdAt: -1 })
            .skip((postPageNum - 1) * limit)
            .limit(limit);
            res.status(200).json(posts);
        }else{
            const posts = await Posts.find()
            .sort({ createdAt: -1 })
            .skip((postPageNum - 1) * limit)
            .limit(limit);
            res.status(200).json(posts);
        }
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = getPosts;