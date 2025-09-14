import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return NextResponse.json({
        success: true,
        message: "This is protected data",
        user: decoded,
        data: {
          items: [
            { id: 1, name: "Secret Item 1" },
            { id: 2, name: "Secret Item 2" },
          ],
        },
      });
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
