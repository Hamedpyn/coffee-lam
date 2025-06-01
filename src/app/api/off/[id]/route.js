import connectToDB from "@/configs/db";
import DisCountModel from "@/models/Discount";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await connectToDB();

    try {
        const { id } = await params

        await DisCountModel.findOneAndDelete({ _id: id })

        return NextResponse.json({ message: "off code deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req, { params }) {
    await connectToDB();

    try {
        const { id } = await params;
        const isOffCode = await DisCountModel.findOne({ code: id })
        if (!isOffCode) {
            return NextResponse.json({ message: "off code not found" }, { status: 404 });
        }
        return NextResponse.json(isOffCode.percent);

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

