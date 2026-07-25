import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectToDB";
import Category from "@/lib/models/Category";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      description,
      image,
      isActive,
    } = body;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const existingCategory = await Category.findOne({
      slug,
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
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
        message: "Failed to create category.",
      },
      {
        status: 500,
      }
    );
  }
}