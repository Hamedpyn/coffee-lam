import styles from "./adminPanelLayout.module.css";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/auth";
import LayoutClient from "../modules/p-user/LayoutClient";
import TokenRefresher from "@/utils/tokenRefresher";

const Layout = async ({ children }) => {
  const user = await authUser();
  if (user) {
    if (user.role !== "ADMIN") {
      return redirect("/");
    }
  } else {
    return redirect("/");
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
