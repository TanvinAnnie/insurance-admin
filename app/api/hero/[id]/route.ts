import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectToDB";
import Hero from "@/lib/models/Hero";

// =========================
// GET Single Hero
// =========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const hero = await Hero.findById(id);

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hero",
      },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE Hero
// =========================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const hero = await Hero.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hero",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE Hero
// =========================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const hero = await Hero.findByIdAndDelete(id);

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Hero deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hero",
      },
      { status: 500 }
    );
  }
}