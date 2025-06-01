import { authUser } from "@/utils/auth";
import ClientPagesLayout from "@/components/layouts/ClientPagesLayout";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import styles from "@/components/templates/Index/latest/latest.module.css"
import Product from "@/components/modules/product/Product";
import productModel from "@/models/Product";
import connectToDB from "@/configs/db";

export default async function Category() {
    await connectToDB();
    const user = await authUser();

  const products = await productModel.find({}).lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

    return (
        <>
            <ClientPagesLayout>
                <Breadcrumb route={"فروشگاه"} />
                <div className={styles.container}>
                    <section className={styles.title}>
                        <div>
                            <p className="text-xl sm:text-2xl lg:text-3xl">فروشگاه</p>
                            <span>category</span>
                        </div>
                    </section>
                    <main data-aos="fade-up" className={'grid !px-5 !py-5 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                        {serializedProducts.map(serializedProduct => (
                            <Product userId={user?._id.toString()} key={serializedProduct._id} {...serializedProduct} />
                        ))}
                    </main>
                </div>
            </ClientPagesLayout>
        </>
    );
}
