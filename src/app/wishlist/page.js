import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import styles from "@/styles/wishlist.module.css";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishListModel from "@/models/WishList";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/auth";
import ClientPagesLayout from "@/components/layouts/ClientPagesLayout";

const page = async () => {
  await connectToDB();
  let wishes = [];

  const user = await authUser();
  if (user) {
    wishes = await WishListModel.find({ user: user._id })
      .populate("product", "name price score")
      .lean();
  } else {
    redirect("/login-register");
  }
  const serializedWishes = JSON.parse(JSON.stringify(wishes))

  return (
    <>
      <ClientPagesLayout>
        <Breadcrumb route={"علاقه مندی ها"} />
        <main className={styles.container} data-aos="fade-up">
          <p className={styles.title}>محصولات مورد علاقه شما</p>
          <section data-aos="fade-up" className={'grid !px-5 !py-5 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {serializedWishes.length > 0 &&
              serializedWishes.map((wish) => <Product key={wish._id} {...wish.product} />)}
          </section>
        </main>

        {serializedWishes.length === 0 && (
          <div className={styles.wishlist_empty} data-aos="fade-up">
            <FaRegHeart />
            <p>محصولی یافت نشد</p>
            <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
            <span>در صفحه &quot;فروشگاه&quot; محصولات جالب زیادی پیدا خواهید کرد.</span>
            <div>
              <Link href="/category">بازگشت به فروشگاه</Link>
            </div>
          </div>
        )}
      </ClientPagesLayout>
    </>
  );
};

export default page;
