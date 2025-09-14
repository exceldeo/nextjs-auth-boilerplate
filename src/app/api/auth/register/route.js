import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // In a real application, you would check if user exists and create a new user
    // For demo purposes, we'll just create a token
    const token = jwt.sign({ userId: 1, email, name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: 1,
        email,
        name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
