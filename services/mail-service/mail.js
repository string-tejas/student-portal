const nodemailer = require("nodemailer");

async function sendEmail(email, subject, message) {
    if (!email || !subject || !message) {
        throw new Error("Missing params");
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = sendEmail;
