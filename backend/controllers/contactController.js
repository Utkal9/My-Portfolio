const Message = require("../models/Message");

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
exports.sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            data: newMessage,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private (Admin Only)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private (Admin Only)
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res
                .status(404)
                .json({ success: false, error: "Message not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
