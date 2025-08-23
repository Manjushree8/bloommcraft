// server/utils/mailer.js
import dotenv from "dotenv";
dotenv.config(); // Ensure .env variables are loaded

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS); // Will print true/false

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Must be 16-char app password, no spaces
  },
});

export async function sendOtpEmail(to, otp) {
  const mail = {
    from: `"BloomCraft" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your BloomCraft OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  };
  await transporter.sendMail(mail);
}

export async function sendWelcomeEmail(to, name) {
  const mail = {
    from: `"BloomCraft" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to BloomCraft 🌸",
    html: `
      <p>Hi ${name},</p>
      <p>We're thrilled to have you join the BloomCraft community!</p>
      <p>Discover a world of beautiful blooms, thoughtful arrangements, and effortless gifting at your fingertips.</p>
      <p>Let’s make every moment blossom!</p>
      <p>Warm regards,<br/>The BloomCraft Team</p>
    `,
  };
  await transporter.sendMail(mail);
}

