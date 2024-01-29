const Users = require('../../models/Users');
const bcrypt = require('bcryptjs');

// Function to handle password change
const changePassword = async (req, res) => {
    try {
        // Extract the new password from the request body
        const { email, password } = req.body;

        // Generate a salt for password hashing
        let saltRound = await bcrypt.genSalt(10);

        // Hash the user's password using the generated salt
        const hash_password = await bcrypt.hash(password, saltRound);

        // Update the user's password in the database
        await Users.updateOne({ email }, { password: hash_password })
            .then(({ modifiedCount }) => {
                if (modifiedCount === 1) {
                    res.status(200).json({ message: "Password updated successfully." });
                } else {
                    res.status(500).json({ message: "Error updating password." });
                }
            });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = changePassword;
