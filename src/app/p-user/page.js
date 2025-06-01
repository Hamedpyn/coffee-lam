import UserPanelLayout from "@/components/layouts/UserPanelLayout"
import Box from "@/components/modules/infoBox/InfoBox"
import styles from "@/styles/p-user/index.module.css";
import Orders from "@/components/templates/p-user/index/Orders"
import Tickets from "@/components/templates/p-user/index/Tickets"
import { authUser } from "@/utils/auth";
import connectToDB from "@/configs/db";
import WishListModel from "@/models/WishList";
import TicketModel from "@/models/Ticket";
import commentModel from "@/models/Comment";
import orderModel from "@/models/Order";
import { redirect } from "next/navigation";
export default async function Index() {
    await connectToDB()
    const user = await authUser();
    if (!user) redirect("/login-register")
    const wishes = await WishListModel.find({ user: user._id })
    const tickets = await TicketModel.find({ user: user._id }).limit(3).populate("department", "title").sort({ _id: -1 }).lean()
    const allTickets = await TicketModel.find({ user: user._id })
    const comments = await commentModel.find({ user: user._id })
    const orders = await orderModel.find({ user: user._id }).limit(3).populate("product.id").sort({ _id: -1 }).lean()

    return (
        <UserPanelLayout>
            <main>
                <section className={styles.boxes}>
                    <Box title="مجموع تیکت ها " value={allTickets.length} />
                    <Box title="مجموع کامنت ها " value={comments.length} />
                    <Box title="مجموع سفارشات" value={orders.length} />
                    <Box title="مجموع علاقه مندی ها" value={wishes.length} />
                </section>
                <section className={`flex-col md:flex-row items-stretch justify-center ${styles.contents}`}>
                    <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
                    <Orders orders={JSON.parse(JSON.stringify(orders))} />
                </section>
            </main>
        </UserPanelLayout>
    )
}
