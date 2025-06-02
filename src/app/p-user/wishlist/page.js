import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import WishListModel from "@/models/WishList";
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";

const page = async () => {
    await connectToDB();
    const user = await authUser();
    if (!user) {
        redirect("/login-register");
    }
    const wishlist = await WishListModel.find({ user: user._id }).populate("product");

    return (
        <UserPanelLayout>
            <main>
                <h1 className={styles.title}>
                    <span>علاقه مندی ها</span>
                </h1>
                <div className={styles.container}>
                    {wishlist.length <= 1 &&
                        wishlist.map((wish) => (
                            <Product
                                key={wish._id}
                                productID={String(wish.product._id)}
                                name={wish.product.name}
                                price={wish.product.price}
                                img={wish.product.img}
                                score={wish.product.score}
                            />
                        ))
                    }
                </div>

                {wishlist.length === 0 && (
                    <p className={styles.empty}>محصولی وجود ندارد</p>
                )}
            </main>
        </UserPanelLayout>
    );
};

export default page;
