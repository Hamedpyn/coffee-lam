import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";
import commentValidator from "@/validators/commentValidator";

export async function POST(req) {
    await connectToDB();

    try {
        const result = await req.json();

        const bodyValidation = commentValidator(result);

        if (bodyValidation !== true) {
            return Response.json({ errors: bodyValidation }, { status: 422 });
        }

        const { username, body, email, score, productID, user } = result;

        const newComment = await commentModel.create({ username, body, email, score, productID, user });

        if (!newComment) {
            return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
        }

        await productModel.findOneAndUpdate({ _id: productID }, {
            $push: {
                comments: newComment._id
            }
        })

        return Response.json({ message: "Product created successfully", product: newComment }, { status: 201 });

    } catch (error) {
        console.error("Error ->", error);
        return Response.json({ message: error }, { status: 500 });
    }
}


export async function DELETE(req) {
    await connectToDB();
    try {
        const { id } = await req.json();

        await commentModel.findOneAndDelete({ _id: id });

        return Response.json({ message: 'comment deleted successfully' });
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    await connectToDB();
    try {
        const { id, body } = await req.json();

        await commentModel.findOneAndUpdate({ _id: id }, { body, isAccept: true });

        return Response.json({ message: 'comment deleted successfully' });
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
