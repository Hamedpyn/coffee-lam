import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import connectToDB from "@/configs/db";
import DataTable from "@/components/templates/p-admin/products/Table";
import productModel from "@/models/Product";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";

const page = async () => {
  await connectToDB();

  const products = await productModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>
      <main>
        <AddProduct />
        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <DataTable
            products={JSON.parse(JSON.stringify(products))}
            title={'لیست محصولات'}
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
