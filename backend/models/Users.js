const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    userImage: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
});

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
    const user = this;

    // Check if the password is being modified
    if (!user.isModified("password")) {
        return next();
    }

    try {
        // Generate a salt for password hashing
        let saltRound = await bcrypt.genSalt(10);

        // Hash the user's password using the generated salt
        const hash_password = await bcrypt.hash(user.password, saltRound);

        // Set the hashed password in the user object
        user.password = hash_password;

        // Continue with the next middleware or save operation
        return next();
    } catch (error) {
        // Pass any error to the next middleware (error-handling)
        next(error);
    }
});

// Method to generate a JSON Web Token (JWT) for the user
userSchema.methods.generateToken = async function () {
    try {
        // Sign a JWT token with user information and a secret key
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET_KEY, // Secret key for signing the token
            {
                expiresIn: '30d' // Token expiration time
            });
    } catch (error) {
        // Log any error that occurs during token generation
        console.error(error);
    }
}


// Method to compare password of user while login
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// Define the model or collection name
const Users = new mongoose.model('User', userSchema);

// Export the Users model
module.exports = Users;
