// defining the client via express routers
const express = require('express');
const client = express.Router();

// importing the controllers
const sendOtp = require('../controllers/client/sendOtp.js');
const signup = require('../controllers/client/signup.js');
const login = require('../controllers/client/login.js');
const setImage = require('../controllers/client/setImage.js');
const getImage = require('../controllers/client/getImage.js');
const changePassword = require('../controllers/client/changePassword.js')
const updateProfile = require('../controllers/client/updateProfile.js')
const getUser = require('../controllers/client/getUser.js')

// importing the middlewares
const authenticateToken = require('../middlewares/authenticateToken.js');
const upload = require('../middlewares/userImageMulter.js');

// setting up the routes
client
    .post('/sendOtp', sendOtp)
    .post('/signup', signup)
    .post('/login', login)
    .post('/changePassword', changePassword)
    .post('/setImage', authenticateToken, upload.single('image'), setImage)
    .post("/getImage", authenticateToken, getImage)
    .post('/updateProfile', authenticateToken, updateProfile)
    .post('/getUser', authenticateToken, getUser)
    .get('/getPosts', require('../controllers/client/getPosts.js'))
    .post('/createPost', require('../controllers/client/createPost.js'))

module.exports = client;
