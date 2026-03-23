import { Resend } from "resend";
import { Message, SiteConfig } from "../models/index.js";

const resend = new Resend(process.env.RESEND_API_KEY);

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

        // 2. Respond instantly
        res.status(201).json({
            success: true,
            message: "Message sent! I will get back to you soon.",
            data: msg,
        });

        // 3. Send notification to you in background
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

                const result = await resend.emails.send({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: [adminEmail],
                    subject: `📬 New message from ${name} — ${subject || "Portfolio Contact"}`,
                    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">

  <div style="background:linear-gradient(135deg,#4f8ef7 0%,#8b5cf6 100%);
    border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:44px;margin-bottom:12px">📬</div>
    <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.5px">
      New Portfolio Message
    </h1>
    <p style="margin:10px 0 0;color:rgba(255,255,255,0.75);font-size:14px">
      Someone reached out through your portfolio
    </p>
  </div>

  <div style="background:#0f1525;border:1px solid rgba(79,142,247,0.2);
    border-top:none;border-radius:0 0 16px 16px;padding:28px">

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <tr>
        <td style="width:50%;padding:14px;
          background:rgba(79,142,247,0.08);
          border:1px solid rgba(79,142,247,0.15);
          border-radius:10px 0 0 0;vertical-align:top">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">
            Name
          </div>
          <div style="color:#fff;font-size:15px;font-weight:700">${name}</div>
        </td>
        <td style="width:50%;padding:14px;
          background:rgba(79,142,247,0.08);
          border:1px solid rgba(79,142,247,0.15);border-left:none;
          border-radius:0 10px 0 0;vertical-align:top">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">
            Email
          </div>
          <a href="mailto:${email}"
            style="color:#4f8ef7;font-size:15px;font-weight:700;text-decoration:none">
            ${email}
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:14px;
          background:rgba(79,142,247,0.05);
          border:1px solid rgba(79,142,247,0.15);border-top:none;
          border-radius:0 0 10px 10px">
          <div style="color:rgba(148,163,200,0.55);font-size:10px;
            text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:5px">
            Subject
          </div>
          <div style="color:#e8edf7;font-size:15px;font-weight:600">
            ${subject || "(No subject)"}
          </div>
        </td>
      </tr>
    </table>

    <div style="background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:12px;padding:20px;margin-bottom:24px">
      <div style="color:rgba(148,163,200,0.55);font-size:10px;
        text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin-bottom:10px">
        Message
      </div>
      <div style="color:#e8edf7;font-size:15px;line-height:1.75;
        white-space:pre-wrap;word-break:break-word">
        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    </div>

    <div style="text-align:center;margin-bottom:24px">
      <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject || "Your message")}"
        style="display:inline-block;
          background:linear-gradient(135deg,#4f8ef7,#8b5cf6);
          color:#fff;text-decoration:none;
          padding:14px 36px;border-radius:12px;
          font-weight:800;font-size:14px">
        ↩&nbsp;&nbsp;Reply to ${name}
      </a>
    </div>

    <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:16px"></div>
    <p style="margin:0;color:rgba(148,163,200,0.35);font-size:11px;text-align:center">
      Received on ${receivedAt} IST
    </p>
  </div>

  <p style="margin:20px 0 0;color:rgba(148,163,200,0.25);font-size:11px;text-align:center">
    Sent from your portfolio contact form
  </p>
</div>
</body>
</html>
          `,
                });

                if (result.error) {
                    console.error("❌ Notification error:", result.error);
                } else {
                    console.log(`✅ Notification sent to ${adminEmail}`);
                }
            } catch (mailErr) {
                console.error("❌ Email error:", mailErr.message);
            }
        });
    } catch (err) {
        console.error("❌ Contact error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ── GET /api/contact/messages (admin) ────────────────────────────────
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

// ── PATCH /api/contact/messages/:id/read (admin) ─────────────────────
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

// ── DELETE /api/contact/messages/:id (admin) ─────────────────────────
export const deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { deleted: true });
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
