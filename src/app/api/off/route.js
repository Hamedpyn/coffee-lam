import { NextResponse } from "next/server";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth";
import DisCountModel from "@/models/Discount";

export async function POST(req) {
    await connectToDB();

    try {
        const user = await authUser()
        const { code, percent, maxUse } = await req.json()

        await DisCountModel.create({ code, percent, maxUse, creator: user._id })

        return NextResponse.json({ message: "off code created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Wishlist Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

