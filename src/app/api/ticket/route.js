import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/auth";
import ticketValidator from "@/validators/ticketValidator";

export async function POST(req) {
    await connectToDB();

    try {
        const { _id } = await authUser()
        const reqBody = await req.json();

        const bodyValidation = ticketValidator(reqBody);

        if (bodyValidation !== true) {
            return Response.json({ errors: bodyValidation }, { status: 422 });
        }

        const { title, body, department, subDepartment, priority } = reqBody;

        const setTicket = await TicketModel.create({
            title, body, user: _id, department, subDepartment, priority
        });

        if (!setTicket) {
            return Response.json({ message: "An unexpected error has occurred" }, { status: 500 });
        }

        return Response.json({ message: "Ticket send successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error ->", error);
        return Response.json({ message: error }, { status: 500 });
    }
}
