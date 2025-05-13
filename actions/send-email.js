"use server";

import { Resend } from "resend";

export async function sendEmail({ to = "mayandimayandi11@gmail.com", subject, react }) {
  const resend = new Resend(process.env.RESEND_API || "");

  if (!process.env.RESEND_API) {
    console.error("RESEND_API is not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    console.log("Attempting to send email to:", to);
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to: [to], // Ensure to is always an array
      subject,
      react,
    });

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return { success: false, error };
  }
}
