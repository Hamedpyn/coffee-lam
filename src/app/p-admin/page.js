import styles from "@/styles/p-admin/index.module.css";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout"
import Box from "@/components/modules/infoBox/InfoBox"
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import TicketModel from "@/models/Ticket";
import UserModel from "@/models/User";
import { authUser } from "@/utils/auth";
import orderModel from "@/models/Order";

export default async function PAdminMainPage() {
    await connectToDB();
    const user = await authUser()
    if (user.role !== "ADMIN") redirect("/")
    const tickets = await TicketModel.find({}).lean();
    const users = await UserModel.find({}).lean();
    const products = await productModel.find({}).lean();
    const orders = await orderModel.find({}).lean();

    return (
        <AdminPanelLayout>
            <main>
                <section className={styles.dashboard_contents}>
                    <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
                    <Box title="مجموع محصولات سایت" value={products.length} />
                    <Box title="مجموع سفارشات" value={orders.length} />
                    <Box title="مجموع کاربر های سایت" value={users.length} />
                </section>{" "}
                <div className={styles.dashboard_charts}>
                    <section>
                        <p>آمار فروش</p>
                        <SaleChart />
                    </section>
                    <section>
                        <p>نرخ رشد</p>
                        <GrowthChart />
                    </section>
                </div>
            </main>
        </AdminPanelLayout>
    )
}
