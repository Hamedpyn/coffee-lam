import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import BanModel from "@/models/Ban";
import DataTable from "@/components/templates/p-admin/tickets/Table";

const page = async () => {
  await connectToDB();

  const tickets = await TicketModel.find({})
    .populate("user")
    .populate("department");
  const banUsers = await BanModel.find({}).lean();

  const bannedInfo = banUsers.map(user => ({
    email: user.email,
    userName: user.userName,
  }));
  

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <DataTable
            tickets={JSON.parse(JSON.stringify(tickets))}
            bannedInfo={JSON.parse(JSON.stringify(bannedInfo))}
            title={'لیست تیکت ها'}
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
