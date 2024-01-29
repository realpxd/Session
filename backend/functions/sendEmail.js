const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, content }) => {
    return new Promise(async (resolve, reject) => {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let options = {
            from: "Session🤎",
            to: to,
            subject: subject,
            html: content
        };

        mailTransporter.sendMail(options, (err) => {
            if (err) {
                console.log(`Failed to send message to ${to}.`);
                reject(err);
            } else {
                console.log(`Message sent successfully to ${to}.`);
                resolve(true);
            }
        });
    });
};

module.exports = sendEmail;
