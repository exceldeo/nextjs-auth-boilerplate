import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "This is public data",
    data: {
      items: [
        { id: 1, name: "Public Item 1" },
        { id: 2, name: "Public Item 2" },
      ],
    },
  });
}
