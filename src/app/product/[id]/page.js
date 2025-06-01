import { notFound } from "next/navigation";

import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import { authUser } from "@/utils/auth";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import ClientPagesLayout from "@/components/layouts/ClientPagesLayout";

const product = async ({ params }) => {
  const user = await authUser();
  await connectToDB();

  const { id: _id } = await params;
  const result = await productModel.findOne({ _id }).populate('comments');

  if (!result) return notFound();

  const serializedProduct = JSON.parse(JSON.stringify(result));

  const relatedProducts = await productModel.find({
    price: { $lte: result.price },
    _id: { $ne: result._id }
  }).limit(4).sort({ price: -1 });
  const serializedRelatedProduct = JSON.parse(JSON.stringify(relatedProducts));

  return (
    <>
      <ClientPagesLayout>
        <div className={styles.container}>
          <div data-aos="fade-up" className={styles.contents}>
            <div className={styles.main}>
              <Details userId={user?._id.toString()} product={serializedProduct} />
              <Gallery img={serializedProduct.img} />
            </div>
            <Tabs user={user?._id.toString()} product={serializedProduct} />
            {relatedProducts.length && <MoreProducts userId={user?._id.toString()} relatedProducts={serializedRelatedProduct} />}
          </div>
        </div>
      </ClientPagesLayout>
    </>
  );
};

export default product;
