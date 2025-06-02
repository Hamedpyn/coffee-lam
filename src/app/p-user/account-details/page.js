import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/p-user/details/AccountDetails";
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authUser()
  if (!user) {
    redirect("/login-register");
  }

  return (
    <Layout>
      <AccountDetails />
    </Layout>
  );
};

export default page;
