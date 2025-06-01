import Table from "@/components/templates/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import connectToDB from "@/configs/db";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";
import DisCountModel from "@/models/Discount";

const Discounts = async () => {
  await connectToDB();
  const discounts = await DisCountModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>
      <main>
        <AddDiscount />

        {!discounts.length ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
