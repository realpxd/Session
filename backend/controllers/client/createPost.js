const Posts = require('../../models/Posts.js');

const createPost = async (req, res) => {
    try {
        const { username, postData, email } = req.body;
        const post = await Posts.create({
            username,
            postData,
            email
        })
        res.status(200).json({
            message: "Post created successfully :)",
            post
        })
        console.log("Post created successfully :)");
        console.log(post);
    } catch (error) {
        res.status(500).json("internal server error");
        console.error("Error creating post:", error);
    }
}

module.exports = createPost;