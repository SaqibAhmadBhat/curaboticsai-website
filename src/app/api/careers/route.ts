import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, position, resume } = body;

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: "Name, email, and position are required." },
        { status: 400 }
      );
    }

    // TODO: Store application, send notification email
    console.log("Career application:", { name, email, position, resume });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Careers API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
