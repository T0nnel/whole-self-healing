import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, focusArea, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const registrationId = `COACH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const fromEmail = process.env.FROM_EMAIL || "Whole Self Healing <onboarding@resend.dev>";
      const notifyAdminEmail = process.env.NOTIFY_EMAIL || "info@wholeselfhealing.co.uk";

      // 1. Send confirmation email to the user
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Thank you for registering your interest — Whole Self Healing",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #2a2b2f; background: #fef9ef; border-radius: 12px; border: 1px solid #d1c9bf;">
            <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #b05a36; font-weight: 600; margin: 0 0 16px 0;">Whole Self Healing</p>
            <h2 style="font-size: 24px; font-weight: 400; color: #2a2b2f; margin: 0 0 16px 0;">Hello ${name},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 16px 0;">
              Thank you for registering your interest in 1:1 coaching. I have received your enquiry and will be in touch personally as private openings become available.
            </p>
            ${
              focusArea
                ? `<div style="background: #f5eee1; padding: 14px 18px; border-radius: 8px; margin: 20px 0; font-size: 14px; border: 1px solid #d1c9bf;">
                    <strong>Focus Area:</strong> ${focusArea}
                  </div>`
                : ""
            }
            <p style="font-size: 14px; line-height: 1.6; color: #515151; margin: 24px 0 0 0;">
              Warmly,<br />
              <strong>Bibi Beck</strong><br />
              <span style="font-size: 12px; color: #65765d;">Psychological Wellbeing Practitioner • Yoga Teacher</span>
            </p>
          </div>
        `,
      });

      // 2. Notify Bibi/Admin about the new registrant
      await resend.emails.send({
        from: fromEmail,
        to: notifyAdminEmail,
        subject: `New Coaching Enquiry from ${name} (${registrationId})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h3>New 1:1 Coaching Registration</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Focus Area:</strong> ${focusArea || "General Coaching"}</p>
            <p><strong>Message:</strong> ${message || "No additional message"}</p>
            <p><strong>Time:</strong> ${timestamp}</p>
          </div>
        `,
      }).catch((e) => console.warn("Admin notification note:", e));
    } else {
      // In development or when RESEND_API_KEY is not yet added, log the details for verification
      console.log(`[Simulated Email Sent] To: ${email} | New 1:1 Coaching Registration for ${name} (${registrationId})`);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${name}! Your interest has been registered. Bibi will personally reach out to ${email} as 1:1 coaching spots become available.`,
        data: {
          id: registrationId,
          name,
          email,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Register interest error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
