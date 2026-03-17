const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

// @desc    Send a message & email notification
// @route   POST /api/contact
exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Save to Database
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // 2. Send Email Notification
        try {
            await sendEmail({ name, email, message });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // We still return 201 because the message is saved in DB
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error: Could not send message.",
        });
    }
};

// @desc    Get all messages (for Admin Dashboard)
// @route   GET /api/contact
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
