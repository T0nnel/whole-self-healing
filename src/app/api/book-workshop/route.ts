import { NextResponse } from "next/server";

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

    // Simulate booking confirmation
    await new Promise((resolve) => setTimeout(resolve, 600));

    const bookingRef = `WSH-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json(
      {
        success: true,
        bookingRef,
        sessionDate: sessionDate || "Next Available Session",
        message: `Your spot has been reserved for "${sessionDate || "Start with Self Compassion"}". A confirmation with access details has been prepared for ${email}.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to complete reservation. Please try again." },
      { status: 500 }
    );
  }
}

