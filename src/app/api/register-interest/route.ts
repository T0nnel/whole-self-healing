import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${name}! Your interest has been registered. Bibi will personally reach out to ${email} as 1:1 coaching spots become available.`,
        data: {
          id: `COACH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          name,
          email,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

