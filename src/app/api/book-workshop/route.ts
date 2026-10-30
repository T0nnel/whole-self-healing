import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, sessionDate } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const bookingRef = `WSH-${Math.floor(100000 + Math.random() * 900000)}`;
    const chosenDate = sessionDate || "Next Available Session";
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const fromEmail = process.env.FROM_EMAIL || "Whole Self Healing <onboarding@resend.dev>";
      const notifyAdminEmail = process.env.NOTIFY_EMAIL || "mbuguatonnel@gmail.com";

      // 1. Send confirmation to attendee (best-effort — won't block the response)
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your Workshop Spot is Confirmed (${bookingRef}) — Whole Self Healing`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #2a2b2f; background: #fef9ef; border-radius: 12px; border: 1px solid #d1c9bf;">
            <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #b05a36; font-weight: 600; margin: 0 0 16px 0;">Whole Self Healing Workshop</p>
            <h2 style="font-size: 24px; font-weight: 400; color: #2a2b2f; margin: 0 0 16px 0;">Welcome, ${name}</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 16px 0;">
              Your place has been reserved for the <strong>Start with Self-Compassion</strong> online cohort.
            </p>
            <div style="background: #f5eee1; padding: 18px 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #d1c9bf;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Booking Reference:</strong> ${bookingRef}</p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Session:</strong> ${chosenDate}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Format:</strong> 60 minutes online</p>
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #333333;">
              You will receive your private session access link and preparation materials 24 hours prior to the session.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #515151; margin: 24px 0 0 0;">
              Warmly,<br />
              <strong>Bibi Beck</strong><br />
              <span style="font-size: 12px; color: #65765d;">Whole Self Healing</span>
            </p>
          </div>
        `,
      }).catch((e) => console.warn("User confirmation note:", e));

      // 2. Notify admin of new workshop attendee (awaited — critical)
      await resend.emails.send({
        from: fromEmail,
        to: notifyAdminEmail,
        subject: `New Workshop Booking: ${name} (${bookingRef})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h3>New Workshop Attendee</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Session:</strong> ${chosenDate}</p>
            <p><strong>Booking Ref:</strong> ${bookingRef}</p>
          </div>
        `,
      }).catch((e) => console.warn("Admin notification note:", e));
    } else {
      console.log(`[Simulated Email Sent] To: ${email} | Workshop Confirmation for ${name} (${bookingRef})`);
    }

    return NextResponse.json(
      {
        success: true,
        bookingRef,
        sessionDate: chosenDate,
        message: `Your spot has been reserved for "${chosenDate}". Access details and confirmation have been prepared for ${email}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Book workshop error:", error);
    return NextResponse.json(
      { error: "Unable to complete reservation. Please try again." },
      { status: 500 }
    );
  }
}
