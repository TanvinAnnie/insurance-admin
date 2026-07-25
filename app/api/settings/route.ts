import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectToDB";
import Settings from "@/lib/models/Settings";

export async function GET() {
  try {
    await connectDB();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        websiteName: "",
        logo: "",
        favicon: "",
        email: "",
        phone: "",
        address: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        youtube: "",
        copyright: "",
        primaryColor: "#2563eb",
        secondaryColor: "#1e293b",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        googleMap: "",
        maintenanceMode: false,
        isActive: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch settings.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update settings.",
      },
      {
        status: 500,
      }
    );
  }
}