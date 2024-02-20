// importing the models and required function
const Users = require('../../models/Users.js');

const signup = async (req, res) => {
    const { name, email, password ,username } = req.body;
    console.log(req.body);
    try {
        // checking if user already exists
        let userExist = await Users.findOne({ email })

        if (!userExist) {

            let userCreated = await Users.create({
                name,
                email,
                password,
                username
            })
            res.status(200).json({
                message: "Account created successfully :)",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
                userData: userCreated
            })
            console.log("User created successfully");
        } else {
            //if user exists, send an error
            res.status(409).json({ message: "User already exists. Try Login :)" })
            console.log("User already exists. Try Login :)");
        }

    } catch (error) {
        res.status(500).json("internal server error");
        console.log("Internal server error");
        console.error(error);
    }
}

module.exports = signup; 