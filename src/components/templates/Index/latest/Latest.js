import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";

const Latest = async ({userId}) => {
  await connectToDB();

  const products = await productModel.find({}).limit(4);
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p className="text-xl sm:text-2xl lg:text-3xl">آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={'grid !px-5 !py-5 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        {serializedProducts.map(serializedProduct => (
          <Product userId={userId} key={serializedProduct._id} {...serializedProduct} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
