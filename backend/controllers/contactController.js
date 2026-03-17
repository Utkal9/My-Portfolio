const Message = require("../models/Message");
const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // 1. Save to Database
        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });

        // 2. Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Message: ${subject}`,
            text: `You have a new message from ${name} (${email}): \n\n ${message}`,
        };

        // 3. Send Email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            data: "Message sent successfully!",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
