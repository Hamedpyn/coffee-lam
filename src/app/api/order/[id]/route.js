import connectToDB from "@/configs/db";
import orderModel from "@/models/Order";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await connectToDB();

    try {
        const { id } = await params;
        const body = await req.json();

        const order = await orderModel.findById(id).lean();

        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Validate every product in the array matches the given product
        const isExactMatch = order.product.every((item) => {
            return (
                item.id.toString() === body.id &&
                item.count === body.count
            );
        });

        if (!isExactMatch) {
            return NextResponse.json(
                { message: "Order products do not match exactly" },
                { status: 400 }
            );
        }

        await orderModel.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Order deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete order error:", error.message);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
