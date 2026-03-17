const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // You can use other services like Outlook/SendGrid
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use App Password, not your real password
        },
    });

    const mailOptions = {
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send the email to yourself
        subject: `New Portfolio Message from ${options.name}`,
        text: `You have a new message:\n\nName: ${options.name}\nEmail: ${options.email}\nMessage: ${options.message}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
