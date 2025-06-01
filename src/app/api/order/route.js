import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";
import DisCountModel from "@/models/Discount";
import { authUser } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();

    try {
        const user = await authUser();
        const { code, product } = await req.json();
        if (!user) {
            return NextResponse.json({ message: "User  not found" }, { status: 404 });

        }
        // Create the order
        await orderModel.create({
            code,
            product,
            user: user._id,
        });

        // Handle discount logic if a code is provided
        if (code) {
            const offCode = await DisCountModel.findOne({ code });

            if (!offCode) {
                return NextResponse.json({ message: "Discount code not found" }, { status: 404 });
            }

            const newUses = offCode.uses + 1;

            if (newUses > offCode.maxUse) {
                return NextResponse.json({ message: "Discount code is expired" }, { status: 422 });
            }

            // Update discount usage
            await DisCountModel.updateOne({ code }, { uses: newUses });
        }

        return NextResponse.json({ message: "ok" }, { status: 201 });

    } catch (error) {
        console.error("Order Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
