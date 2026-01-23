import { Resend } from "resend";
import { env } from "./env";

// Initialize Resend only if API key is available
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  if (!resend) {
    console.warn("Resend API key not configured. Email not sent.");
    return { success: false, message: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || "onboarding@resend.dev",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to Our Platform!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome, ${name}!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>Get started by exploring your dashboard and setting up your profile.</p>
        <p style="margin-top: 30px;">
          <a href="${env.BETTER_AUTH_URL}/dashboard" 
             style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Go to Dashboard
          </a>
        </p>
      </div>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <p style="margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  }),

  emailVerification: (verificationLink: string) => ({
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Verify Your Email</h1>
        <p>Please verify your email address to activate your account:</p>
        <p style="margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours.
        </p>
      </div>
    `,
  }),

  profileUpdated: (name: string) => ({
    subject: "Profile Updated Successfully",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Profile Updated</h1>
        <p>Hi ${name},</p>
        <p>Your profile has been successfully updated.</p>
        <p>If you didn't make this change, please contact support immediately.</p>
      </div>
    `,
  }),
};
