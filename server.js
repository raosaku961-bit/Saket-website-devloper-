import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3e3;
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "raosaku961@gmail.com";
const DATA_DIR = path.resolve(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
function getStoredInquiries() {
  try {
    const content = fs.readFileSync(INQUIRIES_FILE, "utf-8");
    return JSON.parse(content) || [];
  } catch {
    return [];
  }
}
function saveInquiry(inquiry) {
  try {
    const list = getStoredInquiries();
    list.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list.slice(0, 500), null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save inquiry to disk:", err);
  }
}
function getMailTransporter() {
  const gmailUser = process.env.GMAIL_USER || BUSINESS_EMAIL;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (gmailPass && gmailPass.trim() !== "") {
    return {
      configured: true,
      type: "gmail",
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, "")
          // Strip spaces from app password
        }
      }),
      fromEmail: gmailUser
    };
  }
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    return {
      configured: true,
      type: "smtp",
      transporter: nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      }),
      fromEmail: smtpUser
    };
  }
  return { configured: false, type: "none", transporter: null, fromEmail: null };
}
app.get("/api/inquiry/status", (req, res) => {
  const { configured, type } = getMailTransporter();
  const inquiries = getStoredInquiries();
  res.json({
    configured,
    type,
    recipient: BUSINESS_EMAIL,
    inquiriesCount: inquiries.length,
    instructions: configured ? "Email service is configured and ready." : "Google App Password is not yet set in GMAIL_APP_PASSWORD. Inquiries will be logged locally on server."
  });
});
app.post("/api/inquiry", async (req, res) => {
  try {
    const { fullName, businessName, email, country, service, budget, details } = req.body;
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return res.status(400).json({ success: false, message: "Full name is required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }
    if (!service || typeof service !== "string" || !service.trim()) {
      return res.status(400).json({ success: false, message: "Please select a required service." });
    }
    if (!details || typeof details !== "string" || details.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide project details (at least 10 characters)."
      });
    }
    const submissionDate = /* @__PURE__ */ new Date();
    const formattedDate = submissionDate.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long"
    });
    const inquiryRecord = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      fullName: fullName.trim(),
      businessName: businessName?.trim() || "Not specified",
      email: email.trim().toLowerCase(),
      country: country?.trim() || "Not specified",
      service: service.trim(),
      budget: budget?.trim() || "Not specified",
      details: details.trim(),
      submittedAt: submissionDate.toISOString(),
      formattedDate,
      emailDelivered: false,
      deliveryError: null
    };
    const mailConfig = getMailTransporter();
    if (!mailConfig.configured || !mailConfig.transporter) {
      inquiryRecord.deliveryError = "GMAIL_APP_PASSWORD not configured";
      saveInquiry(inquiryRecord);
      return res.status(503).json({
        success: false,
        notConfigured: true,
        inquiryId: inquiryRecord.id,
        message: "Email delivery service is currently awaiting configuration (Google App Password). Your message has been safely saved on the server (ID: " + inquiryRecord.id + "). Please also click WhatsApp or Email to reach Saket directly!"
      });
    }
    const emailSubject = "New Client Inquiry \u2014 Saket Web Developer";
    const plainText = `
New Client Inquiry \u2014 Saket Web Developer
----------------------------------------
Full Name: ${inquiryRecord.fullName}
Business Name: ${inquiryRecord.businessName}
Email Address: ${inquiryRecord.email}
Country: ${inquiryRecord.country}
Requested Service: ${inquiryRecord.service}
Estimated Budget: ${inquiryRecord.budget}
Submission Date and Time: ${inquiryRecord.formattedDate}

Project Details:
${inquiryRecord.details}
----------------------------------------
Inquiry ID: ${inquiryRecord.id}
`.trim();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #131b2e; border: 1px solid #253352; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e3a8a, #4338ca); padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #93c5fd; margin: 6px 0 0; font-size: 13px; }
    .body { padding: 24px; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 12px; }
    .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px; }
    .value { font-size: 15px; color: #f8fafc; font-weight: 500; margin-top: 4px; word-break: break-word; }
    .details-box { background: #0b1120; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
    .badge { display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .footer { background: #0b0f19; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
    .cta-btn { display: inline-block; background: #3b82f6; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; margin-top: 16px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Client Inquiry</h1>
      <p>Saket Web Developer \u2022 ID: ${inquiryRecord.id}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value"><strong>${inquiryRecord.fullName}</strong></div>
      </div>
      <div class="field">
        <div class="label">Business Name</div>
        <div class="value">${inquiryRecord.businessName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${inquiryRecord.email}" style="color: #60a5fa;">${inquiryRecord.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Country / Location</div>
        <div class="value">${inquiryRecord.country}</div>
      </div>
      <div class="field">
        <div class="label">Requested Service</div>
        <div class="value"><span class="badge">${inquiryRecord.service}</span></div>
      </div>
      <div class="field">
        <div class="label">Estimated Budget</div>
        <div class="value">${inquiryRecord.budget}</div>
      </div>
      <div class="field">
        <div class="label">Submission Date & Time</div>
        <div class="value">${inquiryRecord.formattedDate}</div>
      </div>
      <div style="margin-top: 20px;">
        <div class="label" style="margin-bottom: 8px;">Project Details</div>
        <div class="details-box">${inquiryRecord.details}</div>
      </div>
      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${inquiryRecord.email}?subject=Re:%20Your%20Inquiry%20to%20Saket%20Web%20Developer" class="cta-btn">Reply to ${inquiryRecord.fullName}</a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically sent by Saket Web Developer Website Contact Engine to ${BUSINESS_EMAIL}.
    </div>
  </div>
</body>
</html>
`.trim();
    await mailConfig.transporter.sendMail({
      from: `"Saket Web Developer Website" <${mailConfig.fromEmail}>`,
      to: BUSINESS_EMAIL,
      replyTo: inquiryRecord.email,
      subject: emailSubject,
      text: plainText,
      html: htmlContent
    });
    inquiryRecord.emailDelivered = true;
    saveInquiry(inquiryRecord);
    return res.json({
      success: true,
      deliveredByEmail: true,
      inquiryId: inquiryRecord.id,
      message: "Thank you for contacting Saket Web Developer! Your inquiry has been submitted successfully. I'll review your message and get back to you."
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error processing contact inquiry:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to deliver email: ${errMessage}. Please try sending directly via WhatsApp or Email.`
    });
  }
});
app.post("/api/inquiry/test", async (req, res) => {
  try {
    const mailConfig = getMailTransporter();
    if (!mailConfig.configured || !mailConfig.transporter) {
      return res.status(400).json({
        success: false,
        message: "GMAIL_APP_PASSWORD or SMTP credentials are not configured in .env"
      });
    }
    await mailConfig.transporter.sendMail({
      from: `"Saket Web Developer Test" <${mailConfig.fromEmail}>`,
      to: BUSINESS_EMAIL,
      subject: "Test Notification \u2014 Saket Web Developer Email Setup",
      text: "Congratulations Saket! Your contact form email delivery is configured properly and working.",
      html: '<div style="font-family:sans-serif;padding:20px;background:#0f172a;color:#f8fafc;border-radius:8px;"><h2>Congratulations Saket!</h2><p>Your contact form email delivery is configured properly and working seamlessly.</p><p>Recipient: <strong>' + BUSINESS_EMAIL + "</strong></p></div>"
    });
    return res.json({ success: true, message: `Test email sent successfully to ${BUSINESS_EMAIL}!` });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ success: false, message: `Email delivery failed: ${errMessage}` });
  }
});
app.get("/api/inquiries", (req, res) => {
  const inquiries = getStoredInquiries();
  res.json({ inquiries });
});
app.get("/api/download-zip", (req, res) => {
  const zipPath = path.resolve(process.cwd(), "saket-web-developer.zip");
  if (fs.existsSync(zipPath)) {
    res.download(zipPath, "saket-web-developer.zip");
  } else {
    res.status(404).json({ error: "Zip archive not found" });
  }
});
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Saket Web Developer server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
