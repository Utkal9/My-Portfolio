import nodemailer from "nodemailer";
import { Message, SiteConfig } from "../models/index.js";
import dns from "dns";

// 🚀 RENDER TIMEOUT FIX: Force Node.js 22 to use IPv4 instead of IPv6
dns.setDefaultResultOrder("ipv4first");

// ── Create Transporter using built-in OAuth2 ──────────────────────────
function createTransporter() {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.MAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
        // Prevent Render from dropping the connection prematurely
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000,
        tls: {
            rejectUnauthorized: false, // Helps bypass strict cloud firewall checks
        },
    });
}

// ── POST /api/contact (public) ────────────────────────────────────────
export const sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email and message are required",
        });
    }

    try {
        // 1. Save to DB
        const msg = await Message.create({ name, email, subject, message });

        // 2. Respond instantly to frontend
        res.status(201).json({
            success: true,
            message: "Message sent! I will get back to you soon.",
            data: msg,
        });

        // 3. Send emails in background
        setImmediate(async () => {
            try {
                const config = await SiteConfig.findOne();
                const adminEmail =
                    config?.contact?.receiverEmail ||
                    process.env.ADMIN_EMAIL ||
                    "utkalbehera59@gmail.com";

                const receivedAt = new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "full",
                    timeStyle: "short",
                });

                const transporter = createTransporter();

                // ── Notification to YOU ───────────────────────────────────
                await transporter.sendMail({
                    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
                    to: adminEmail,
                    subject: `📬 New message from ${name} — ${subject || "Portfolio Contact"}`,
                    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:linear-gradient(135deg,#4f8ef7,#8b5cf6);
    border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">📬</div>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">New Portfolio Message</h1>
  </div>
  <div style="background:#0f1525;border:1px solid rgba(79,142,247,0.2);
    border-top:none;border-radius:0 0 16px 16px;padding:28px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <tr>
        <td style="width:50%;padding:14px;background:rgba(79,142,247,0.08);
          border:1px solid rgba(79,142,247,0.15);border-radius:10px 0 0 0;vertical-align:top">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">Name</div>
          <div style="color:#fff;font-size:15px;font-weight:700">${name}</div>
        </td>
        <td style="width:50%;padding:14px;background:rgba(79,142,247,0.08);
          border:1px solid rgba(79,142,247,0.15);border-left:none;
          border-radius:0 10px 0 0;vertical-align:top">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">Email</div>
          <a href="mailto:${email}"
            style="color:#4f8ef7;font-size:15px;font-weight:700;text-decoration:none">
            ${email}
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:14px;background:rgba(79,142,247,0.05);
          border:1px solid rgba(79,142,247,0.15);border-top:none;
          border-radius:0 0 10px 10px">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">Subject</div>
          <div style="color:#e8edf7;font-size:15px;font-weight:600">
            ${subject || "(No subject)"}
          </div>
        </td>
      </tr>
    </table>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
      border-radius:12px;padding:20px;margin-bottom:24px">
      <div style="color:rgba(148,163,200,0.55);font-size:10px;
        text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:10px">Message</div>
      <div style="color:#e8edf7;font-size:15px;line-height:1.75;white-space:pre-wrap">
        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    </div>
    <div style="text-align:center;margin-bottom:24px">
      <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject || "Your message")}"
        style="display:inline-block;background:linear-gradient(135deg,#4f8ef7,#8b5cf6);
          color:#fff;text-decoration:none;padding:14px 36px;border-radius:12px;
          font-weight:800;font-size:14px">
        ↩ Reply to ${name}
      </a>
    </div>
    <p style="margin:0;color:rgba(148,163,200,0.35);font-size:11px;text-align:center">
      Received on ${receivedAt} IST
    </p>
  </div>
</div>
</body>
</html>
          `,
                });

                console.log(`✅ Notification sent to ${adminEmail}`);

                // ── Auto-reply to sender ──────────────────────────────────
                await transporter.sendMail({
                    from: `"Utkal Behera" <${process.env.MAIL_USER}>`,
                    to: email,
                    subject: `Thanks for reaching out, ${name}! 👋`,
                    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:linear-gradient(135deg,#4f8ef7,#8b5cf6);
    border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">👋</div>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Thanks for reaching out!</h1>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;
    border-top:none;border-radius:0 0 16px 16px;padding:32px">
    <p style="margin:0 0 16px;color:#1a1b2e;font-size:16px">
      Hi <strong>${name}</strong>,
    </p>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.75">
      Thanks for getting in touch through my portfolio! I've received your
      message and will get back to you as soon as possible —
      usually within <strong>24 hours</strong>.
    </p>
    <div style="background:#f8faff;border-left:3px solid #4f8ef7;
      border-radius:0 8px 8px 0;padding:16px;margin-bottom:24px">
      <div style="color:#94a3b8;font-size:10px;text-transform:uppercase;
        letter-spacing:0.1em;font-weight:700;margin-bottom:8px">Your message</div>
      <div style="color:#475569;font-size:14px;line-height:1.7;white-space:pre-wrap">
        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    </div>
    <p style="margin:0;color:#475569;font-size:15px;line-height:1.7">
      Best regards,<br/>
      <strong style="color:#1a1b2e;font-size:16px">Utkal Behera</strong><br/>
      <span style="color:#94a3b8;font-size:13px">Full Stack Developer</span>
    </p>
  </div>
</div>
</body>
</html>
          `,
                });

                console.log(`✅ Auto-reply sent to ${email}`);
            } catch (mailErr) {
                console.error("❌ Email error:", mailErr.message);
            }
        });
    } catch (err) {
        console.error("❌ Contact error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ deleted: false }).sort({
            createdAt: -1,
        });
        res.json({
            success: true,
            data: messages,
            unread: messages.filter((m) => !m.read).length,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const markRead = async (req, res) => {
    try {
        const msg = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true },
        );
        res.json({ success: true, data: msg });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { deleted: true });
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
