import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/connectToDB";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    await connectToDB();

    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const slug = generateSlug(body.name);

    const exists = await Product.findOne({ slug });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Product already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.create({
      name: body.name,
      slug,
      description: body.description,
      category: body.category,
      image: body.image,
      price: body.price,
      discountPrice: body.discountPrice,
      stock: body.stock,
      featured: body.featured,
      isActive: body.isActive,
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      {
        status: 500,
      }
    );
  }
}