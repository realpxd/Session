const Posts = require('../../models/Posts.js');

const updatePost = async (req, res) => {
    const { postId, like, comment ,curLikes , likedBy} = req.body;

    try {
        let post = await Posts.findById(postId);
        if (!post.likedBy.includes(likedBy)) {
            post.likes += 1;
            post.likedBy.push(likedBy);
            console.log(post);
        } else {
            post.likes -= 1;
            post.likedBy.pop(likedBy);
            console.log(post);
        }
        await post.save();
        res.status(200).json(post);
        
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json("Internal server error");
    }
}

module.exports = updatePost;
