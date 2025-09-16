import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // In a real application, you would validate credentials against a database
    if (email === "user@example.com" && password === "password") {
      const token = jwt.sign(
        { userId: 1, email: "user@example.com" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: 1,
          email: "user@example.com",
          name: "John Doe",
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
