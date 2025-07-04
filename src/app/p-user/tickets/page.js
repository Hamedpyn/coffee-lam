import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth";
import TicketModel from "@/models/Ticket";
import { redirect } from "next/navigation";

const page = async () => {
  connectToDB();
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  const tickets = await TicketModel.find({ user: user._id })
    .populate("department", "title")
    .sort({ _id: -1 });

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
