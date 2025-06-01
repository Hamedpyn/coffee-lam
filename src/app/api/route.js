import connectToDB from "@/configs/db";

export async function GET() {
    await connectToDB();
    try {
        return Response.json({ message: "SUCCESS" })
    } catch (error) {
        console.log("Error ->", err);

    }
}
