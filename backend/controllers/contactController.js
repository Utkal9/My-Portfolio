import nodemailer from "nodemailer";
import { Message, SiteConfig } from "../models/index.js";

// ── Single persistent transporter — much faster than creating each time ──
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    pool: true, // reuse SMTP connections
    maxConnections: 5,
    rateLimit: 5,
});

transporter.verify((err) => {
    if (err) console.error("❌ Mail error:", err.message);
    else console.log("✅ Mail transporter ready");
});

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

        // 2. Respond instantly — don't wait for emails
        res.status(201).json({
            success: true,
            message: "Message sent successfully! I will get back to you soon.",
            data: msg,
        });

        // 3. Send emails in background — non-blocking
        setImmediate(async () => {
            try {
                const config = await SiteConfig.findOne();
                const adminEmail =
                    config?.contact?.receiverEmail ||
                    process.env.ADMIN_EMAIL ||
                    process.env.MAIL_USER;

                const receivedAt = new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "full",
                    timeStyle: "short",
                });

                // ── Notification email to YOU ──────────────────────────────
                await transporter.sendMail({
                    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
                    to: adminEmail,
                    subject: `📬 New message from ${name} — ${subject || "Portfolio Contact"}`,
                    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#4f8ef7 0%,#8b5cf6 100%);
    border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">📬</div>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px">
      New Portfolio Message
    </h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px">
      Someone reached out through your portfolio
    </p>
  </div>

  <!-- Body -->
  <div style="background:#0f1525;border:1px solid rgba(79,142,247,0.2);
    border-top:none;border-radius:0 0 16px 16px;padding:28px">

    <!-- Sender info grid -->
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
          border-radius:0 0 10px 10px;vertical-align:top">
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

    <!-- Message content -->
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

    <!-- Quick reply button -->
    <div style="text-align:center;margin-bottom:24px">
      <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject || "Your message")}"
        style="display:inline-block;
          background:linear-gradient(135deg,#4f8ef7,#8b5cf6);
          color:#fff;text-decoration:none;
          padding:14px 36px;border-radius:12px;
          font-weight:800;font-size:14px;letter-spacing:0.02em">
        ↩&nbsp; Reply to ${name}
      </a>
    </div>

    <!-- Divider -->
    <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:16px"></div>

    <!-- Timestamp -->
    <p style="margin:0;color:rgba(148,163,200,0.35);font-size:11px;text-align:center">
      Received on ${receivedAt} IST
    </p>
  </div>

  <!-- Footer -->
  <p style="margin:20px 0 0;color:rgba(148,163,200,0.25);font-size:11px;text-align:center">
    Sent from your portfolio contact form ·
    <a href="https://my-portfolio-nu-flax-96.vercel.app"
      style="color:rgba(79,142,247,0.5);text-decoration:none">
      View Portfolio
    </a>
  </p>
</div>
</body>
</html>
          `,
                });

                console.log(`✅ Notification sent to ${adminEmail}`);

                // ── Auto-reply to the person who contacted you ─────────────
                await transporter.sendMail({
                    from: `"Utkal Behera" <${process.env.MAIL_USER}>`,
                    to: email,
                    subject: `Thanks for reaching out, ${name}! 👋`,
                    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#4f8ef7 0%,#8b5cf6 100%);
    border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <div style="font-size:40px;margin-bottom:12px">👋</div>
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">
      Thanks for reaching out!
    </h1>
  </div>

  <!-- Body -->
  <div style="background:#fff;border:1px solid #e2e8f0;
    border-top:none;border-radius:0 0 16px 16px;padding:32px">

    <p style="margin:0 0 16px;color:#1a1b2e;font-size:16px;line-height:1.6">
      Hi <strong>${name}</strong>,
    </p>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.75">
      Thanks for getting in touch through my portfolio! I've received your
      message and will get back to you as soon as possible —
      usually within <strong>24 hours</strong>.
    </p>

    <!-- Their message -->
    <div style="background:#f8faff;border-left:3px solid #4f8ef7;
      border-radius:0 8px 8px 0;padding:16px;margin-bottom:24px">
      <div style="color:#94a3b8;font-size:10px;text-transform:uppercase;
        letter-spacing:0.1em;font-weight:700;margin-bottom:8px">
        Your message
      </div>
      <div style="color:#475569;font-size:14px;line-height:1.7;
        white-space:pre-wrap;word-break:break-word">
        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    </div>

    <!-- Social links -->
    <div style="text-align:center;margin-bottom:28px">
      <a href="https://github.com/Utkal9"
        style="display:inline-block;margin:0 6px;
          background:#1a1b2e;color:#fff;text-decoration:none;
          padding:10px 22px;border-radius:10px;font-size:13px;font-weight:700">
        GitHub
      </a>
      <a href="https://linkedin.com/in/utkal-behera59"
        style="display:inline-block;margin:0 6px;
          background:#0077b5;color:#fff;text-decoration:none;
          padding:10px 22px;border-radius:10px;font-size:13px;font-weight:700">
        LinkedIn
      </a>
      <a href="https://leetcode.com/u/utkal59"
        style="display:inline-block;margin:0 6px;
          background:#f89f1b;color:#fff;text-decoration:none;
          padding:10px 22px;border-radius:10px;font-size:13px;font-weight:700">
        LeetCode
      </a>
    </div>

    <p style="margin:0;color:#475569;font-size:15px;line-height:1.7">
      Best regards,<br/>
      <strong style="color:#1a1b2e;font-size:16px">Utkal Behera</strong><br/>
      <span style="color:#94a3b8;font-size:13px">
        Full Stack Developer · MERN Stack · LPU CSE
      </span>
    </p>
  </div>

  <!-- Footer -->
  <p style="margin:20px 0 0;color:#94a3b8;font-size:11px;text-align:center">
    This is an automated reply — please do not reply to this email.
  </p>
</div>
</body>
</html>
          `,
                });

                console.log(`✅ Auto-reply sent to ${email}`);
            } catch (mailErr) {
                console.error("❌ Email error:", mailErr.message);
                // Message already saved to DB — user already got success response
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
