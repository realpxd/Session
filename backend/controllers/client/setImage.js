const path = require('path');
const Users = require('../../models/Users'); // Import the user model
const fs = require('fs');

const setImage = async (req, res) => {
    try {
        // Check if the file is present in the request
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        // Extract user ID from the JWT token in the request header
        const userId = req.user.userId; // User ID added to request by the authenticateToken middleware

        // Get the path of the uploaded image
        const imagePath = req.file.path;

        // Extract only the filename from the path
        const imageName = path.basename(imagePath);

        // Find the previously saved user image from the database
        let userData = await Users.findOne({ _id: userId });
        if (userData) {
            let { userImage } = userData;
            if (userImage === '') {
                // If no previous image, update the user profile with the new image
                await Users.updateOne({ _id: userId }, { userImage: imageName })
                    .then(() => {
                        res.status(200).json({ message: 'Image uploaded and user profile updated successfully.' });
                    });
            } else {
                // If there is a previous image, remove it from the server
                fs.rm(path.join(path.dirname(imagePath), userImage), { recursive: true }, async (err) => {
                    if (!err) {
                        // After successfully removing the previous image, update the user profile with the new image
                        await Users.updateOne({ _id: userId }, { userImage: imageName })
                            .then(() => {
                                res.status(200).json({ message: 'Image uploaded and user profile updated successfully.' });
                            });
                    }
                });
            }
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = setImage;
