import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";
import DataTable from "@/components/templates/p-admin/comments/Table";
import commentModel from "@/models/Comment";

const page = async () => {
  await connectToDB();

  const comments = await commentModel.find({})
    .populate("user")
    .populate("productID");

  const banUsers = await BanModel.find({}).lean();

  const bannedInfo = banUsers.map(user => ({
    email: user.email,
    userName: user.userName,
  }));
  

  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            bannedInfo={JSON.parse(JSON.stringify(bannedInfo))}
            title={'لیست کامنت ها'}
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
