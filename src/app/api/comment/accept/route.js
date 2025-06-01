import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";

export async function PUT(req) {
    await connectToDB();
    try {
        const { id } = await req.json();

         await commentModel.findOneAndUpdate(
            { _id: id },
            { isAccept: true });

        return Response.json({ message: 'comment updated successfully' });
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}