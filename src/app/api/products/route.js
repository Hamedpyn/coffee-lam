import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await connectToDB();

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const shortDescription = formData.get("shortDescription");
    const longDescription = formData.get("longDescription");
    const weight = formData.get("weight");
    const tags = formData.get("tags");
    const img = formData.get("img");

    // Upload to Cloudinary
    let imageUrl = null;
    if (img && typeof img === 'object') {
      const buffer = Buffer.from(await img.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
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

    const product = await productModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      tags,
      img: imageUrl,
    });

    return Response.json(
      { message: "Product created successfully :))", data: product },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error ->", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function GET() {
    await connectToDB();

    try {
        const setComment = await productModel.find({}, '-__v').populate('comments')

        return Response.json({ message: "Product sent successfully", product: setComment }, { status: 200 });

    } catch (error) {
        console.error("Error ->", error);
        return Response.json({ message: error }, { status: 500 });
    }
}
