import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function PUT(req, { params }) {
    await connectToDB();
    try {
        const { id: _id } = await params;
        const body = await req.json();

        // Find the user first to get current role (and confirm they exist)
        const user = await UserModel.findById(_id);
        if (!user) {
            return Response.json({ error: "User not found." }, { status: 404 });
        }

        // Dynamically build updateFields
        const updateFields = {};
        if (body.userName) updateFields.userName = body.userName;
        if (body.email) updateFields.email = body.email;

        // Handle role change toggle
        if ('role' in body) {
            updateFields.role = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
        }

        if (Object.keys(updateFields).length === 0) {
            return Response.json({ error: "No valid fields provided to update." }, { status: 400 });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id },
            updateFields,
            {
                new: true,
                select: '-password -__v -refreshToken'
            }
        );

        return Response.json(updatedUser);
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    await connectToDB();
    try {

        const { id: _id } = await params;

        const updatedUser = await UserModel.findOneAndDelete({ _id });

        return Response.json(updatedUser);
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

