import { NextResponse } from "next/server";
import { Category } from "@/lib/models/Category";
import { connectToDB } from "@/lib/connectToDB";

export async function GET() {
  await connectToDB();
  const data = await Category.find();
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Connect to the database
    await connectToDB();
    await Category.create(data);
    return NextResponse.json(
      { message: "Data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { message: "Failed to create data" },
      { status: 500 }
    );
  }
}