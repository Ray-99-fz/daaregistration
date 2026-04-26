// backend/services/emailService.js
import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "../emails/WelcomeEmail.jsx";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to, name) {
  try {
    const html = await render(WelcomeEmail({ name }));
    console.log(html)
    console.log(typeof html)

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // change in prod
      to,
      subject: "Welcome 🎉",
      html,
    });

    console.log("Sending to:", to);
    // console.log("HTML preview:", html.slice(0, 100));

    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}