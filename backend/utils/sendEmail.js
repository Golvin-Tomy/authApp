const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"StringCraft Support" <noreply@stringcraft.com>`,
      to,
      subject,
      html,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error(" Email sending error:", err.message);
    throw new Error("Email not sent");
  }
};

module.exports = sendEmail;
