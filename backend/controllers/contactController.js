import nodemailer from 'nodemailer';
import { Message, SiteConfig } from '../models/index.js';

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

// POST /api/contact  (public)
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, message required' });

    // Save to DB
    const msg = await Message.create({ name, email, subject, message });

    // Get admin email from siteconfig
    const config = await SiteConfig.findOne();
    const adminEmail = config?.contact?.receiverEmail || process.env.ADMIN_EMAIL;

    // Send email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
        to: adminEmail,
        subject: `[Portfolio] New Message from ${name}: ${subject || 'No Subject'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px">
            <h2 style="color:#4f8ef7">New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <hr/>
            <p>${message.replace(/\n/g,'<br/>')}</p>
          </div>
        `,
      });
      // Auto-reply
      await transporter.sendMail({
        from: `"Utkal Behera" <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Thanks for reaching out!',
        html: `
          <div style="font-family:sans-serif;max-width:600px">
            <h2 style="color:#4f8ef7">Hey ${name}, thanks for your message!</h2>
            <p>I'll get back to you as soon as possible.</p>
            <p>— Utkal Behera</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error('Mail error:', mailErr.message);
      // Don't fail the request if email fails
    }

    res.status(201).json({ success: true, message: 'Message sent!', data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contact/messages  (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ deleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, data: messages, unread: messages.filter(m => !m.read).length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contact/messages/:id/read  (admin)
export const markRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contact/messages/:id  (admin)
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { deleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
