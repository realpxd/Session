// importing the models and required function
const Users = require('../../models/Users.js')
const sendEmail = require('../../functions/sendEmail.js')

const sendOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // checking if the user exists already
        let response = await Users.findOne({ email });
        if (response) {
            // if user exists, send forget pass otp
            let options = {
                to: email,
                subject: "!! Account Recovery !!",
                content: `<h3>Your OTP to change your password is: </h3> 
                <h1>${otp}</h1>`
            }
            await sendEmail(options)
                .then(() => {
                    res.status(200).json({
                        message: "Email sent successfully",
                    })
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Failed to send email"
                    })
                })
        } else {
            // if user doesnt exists , send signup otp
            let options = {
                to: email,
                subject: "!! Welcome to Oolker !!",
                content: `<h3>Your OTP to join Session is: </h3> 
                          <h1>${otp}</h1>`
            }
            await sendEmail(options)
                .then(() => {
                    res.status(200).json({
                        message: "Email sent successfully",
                    })
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Failed to send email"
                    })
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "SendUserOtp encountered an error."
        })
    }
}

module.exports = sendOtp;
