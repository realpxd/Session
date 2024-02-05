const bcrypt = require('bcryptjs');
const Users = require('../../models/Users.js');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Checking if user already exists
        let userExist = await Users.findOne({ email })

        if (!userExist) {
            // If user does not exist, send an error
            res.status(405).json({ message: "Invalid Credentials" })
        } else {
            // If user exists, check the password
            const isPasswordValid = await userExist.comparePassword(password);

            if (isPasswordValid) {
                // If password is valid, generate a token and send a success response
                res.status(200).json({
                    message: "Login successful.",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString()
                })
            } else {
                // If password is invalid, send an error
                res.status(401).json({ message: "Invalid email or password" })
            }
        }

    } catch (error) {
        // Handle internal server error
        res.status(500).json("Internal server error");
    }
}

module.exports = login;
