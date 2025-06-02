import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth";
import commentModel from "@/models/Comment";
import { redirect } from "next/navigation";
import styles from "@/styles/p-user/wishlist.module.css"
const page = async () => {
  connectToDB();
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  const comments = await commentModel.find({ user: String(user?._id) }, "-__v").populate("productID", "name");


  return (
    <Layout>
      <main>
        {comments.length ? <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        /> : <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>}

      </main>
    </Layout>
  );
};

export default page;
