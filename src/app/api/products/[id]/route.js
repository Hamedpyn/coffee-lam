import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

export async function DELETE(req, { params }) {
    await connectToDB();

    try {
        const { id: _id } = await params;

        await productModel.findOneAndDelete({ _id })

        return Response.json({ message: "Product deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error ->", error);
        return Response.json({ message: error }, { status: 500 });
    }
}