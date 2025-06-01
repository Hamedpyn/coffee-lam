import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/auth";

export async function POST(req, { params }) {
    await connectToDB();

    try {
        const user = await authUser()
        const { id: _id } = await params;
        const { body } = await req.json();

        const setTicket = await TicketModel.findOneAndUpdate({ _id }, {
            answer: [{ body, userName: user.userName }], hasAnswer: true,
        });

        if (!setTicket) {
            return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
        }

        return Response.json({ message: "Ticket updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error ->", error);
        return Response.json({ message: error }, { status: 500 });
    }
}
