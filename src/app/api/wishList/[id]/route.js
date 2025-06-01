import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import WishListModel from "@/models/WishList";
import { authUser } from "@/utils/auth";

export async function GET(req, { params }) {
    await connectToDB();

    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return Response.json({ error: "Token does not exist" }, { status: 404 });
        }

        const { id } = await params;

        const doesUserExist = await UserModel.findById(id);
        if (!doesUserExist) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }

        const findProducts = await WishListModel.find({ user: id }, '-__v -user').populate("product")

        return NextResponse.json({ message: "Wishlist fetched successfully", data: findProducts }, { status: 200 });

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectToDB();

    try {
        const user = await authUser()

        if (!user) {
            return Response.json({ error: "User does not exist" }, { status: 404 });
        }

        const { id } = await params;

        await WishListModel.findOneAndDelete({ product: id, user: user._id })

        return NextResponse.json({ message: "product deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
