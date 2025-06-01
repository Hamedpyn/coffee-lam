import React from "react";
import styles from "./userPanelLayout.module.css";
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import LayoutClient from "../modules/p-user/LayoutClient";
import TokenRefresher from "@/utils/tokenRefresher";

const Layout = async ({ children }) => {
  const user = await authUser();

  if (!user) {
    redirect("/login-register");
  }

  return (
    <div className={styles.layout}>
      <TokenRefresher />
        <LayoutClient>
          {children}
        </LayoutClient>
    </div>
  );
};

export default Layout;
