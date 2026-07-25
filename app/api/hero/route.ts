import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectToDB";
import Hero from "@/lib/models/Hero";


// GET All Hero
export async function GET() {
  try {
    await connectDB();

    const heroes = await Hero.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: heroes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hero data",
      },
      {
        status: 500,
      }
    );
  }
}


// Create Hero
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const hero = await Hero.create({
      badge: body.badge,
      title: body.title,
      description: body.description,
      buttonText: body.buttonText,
      buttonLink: body.buttonLink,
      videoText: body.videoText,
      videoLink: body.videoLink,
      backgroundImage: body.backgroundImage,
      isActive: body.isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Hero created successfully",
        data: hero,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create hero",
      },
      {
        status: 500,
      }
    );
  }
}