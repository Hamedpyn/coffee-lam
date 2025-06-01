import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import UserModel from "@/models/User";
import WishListModel from "@/models/WishList";
import wishListValidator from "@/validators/wishListValidator";

export async function POST(req) {
    await connectToDB();

    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return Response.json({ error: "Token does not exist" }, { status: 404 });
        }
        
        const data = await req.json();

        const validationResult = wishListValidator(data);
        if (validationResult !== true) {
            return NextResponse.json({ errors: validationResult }, { status: 422 });
        }

        const { user, product } = data;

        const doesUserExist = await UserModel.findById(user);
        if (!doesUserExist) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }

        const doesProductExist = await productModel.findById(product);
        if (!doesProductExist) {
            return NextResponse.json({ message: "Product does not exist" }, { status: 404 });
        }

        const alreadyInWishlist = await WishListModel.findOne({ user, product });
        if (alreadyInWishlist) {
            return NextResponse.json({ message: "Product already in wishlist" }, { status: 409 });
        }

        const created = await WishListModel.create({ user, product });

        return NextResponse.json({ message: "Product added to wishlist", data: created }, { status: 201 });

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
