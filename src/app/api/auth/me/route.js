import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";
import UserModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  await connectToDB();
  try {
    const cookieStorage = await cookies()
    const token = cookieStorage.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    const { data: email } = verifyToken(token);

    const userDetails = await UserModel.findOne(
      { email },
      '-password -__v -refreshToken'
    );

    if (!userDetails) {
      return NextResponse.json({ user: null }, { status: 404 });
    }
    return NextResponse.json({ user: userDetails });
  } catch (err) {
    console.error("Error ->", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  await connectToDB();

  try {
    const formData = await req.formData();
    const userName = formData.get("userName");
    const email = formData.get("email");
    const img = formData.get("img");

    let imageUrl = null;

    // Handle image upload to Cloudinary
    if (img && typeof img === 'object') {
      const buffer = Buffer.from(await img.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'users', // optional
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(buffer);
      });

      imageUrl = result.secure_url;
    }

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return Response.json({ error: "Token does not exist" }, { status: 401 });
    }

    const { data } = verifyToken(token); // should return user email or id
    const updateFields = {
      userName,
      email,
    };

    if (imageUrl) {
      updateFields.img = imageUrl;
    }

    const user = await UserModel.findOneAndUpdate(
      { email: data },
      updateFields
    );

    revalidatePath("/p-user/account-details")
    return Response.json(user, { status: 200 });

  } catch (err) {
    console.error("Error ->", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectToDB();
  try {
    const { userName, email } = await req.json();

    await BanModel.create({ userName, email });

    return Response.json({ message: "User baned successfully" });

  } catch (err) {
    console.error("Error ->", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
