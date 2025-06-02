import Layout from "@/components/layouts/UserPanelLayout";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth";
import orderModel from "@/models/Order";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import { redirect } from "next/navigation";

const page = async () => {
    connectToDB();
    const user = await authUser();
    if (!user) {
        redirect("/login-register");
    }
    const rawOrders = await orderModel.find({ user: String(user?._id) }, "-__v").populate("product.id").lean()
    const orders = JSON.parse(JSON.stringify(rawOrders))

    return (
        <Layout>
            <main>
                <h1 className={styles.title}>
                    <span>سفارشات</span>
                </h1>
                <div className={styles.container}>
                    {orders.length > 0 &&
                        orders.map(order =>
                            order.product.map((wish) => (
                                <Product
                                    id={order._id}
                                    key={wish._id || wish.id._id}
                                    {...wish.id}
                                    productID={wish.id._id}
                                    count={wish.count}
                                />
                            ))
                        )
                    }

                    {orders.length === 0 && (
                        <p className={styles.empty}>سفارشی وجود ندارد</p>
                    )}
                </div>

            </main>
        </Layout>
    );
};

export default page;
