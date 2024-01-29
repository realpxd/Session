const Users = require('../../models/Users.js');

const getImage = async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });

    if (user && user.userImage) {
        // Assuming userImage is the property where the image is stored
        // Send the image as a response
        res.status(200).send(user.userImage);
    } else {
        res.status(401).json({ error: 'Image not found' });
    }
};

module.exports = getImage;
