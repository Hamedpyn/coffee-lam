import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import DataTable from "@/components/templates/p-admin/users/Table";
import BanModel from "@/models/Ban";

const page = async () => {
  await connectToDB();

  const users = await UserModel.find({}).lean();
  const banUsers = await BanModel.find({}).lean();

  const bannedInfo = banUsers.map(user => ({
    email: user.email,
    userName: user.userName,
  }));

  return (
    <Layout>
      <main>
        {users.length === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (
          <DataTable
            users={JSON.parse(JSON.stringify(users))}
            bannedInfo={JSON.parse(JSON.stringify(bannedInfo))}
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
