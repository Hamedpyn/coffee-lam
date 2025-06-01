import Articles from "@/components/templates/Index/articles/Articles";
import Banner from "@/components/templates/Index/Banner/Banner";
import Latest from "@/components/templates/Index/latest/Latest";
import Promote from "@/components/templates/Index/promote/Promote";
import { authUser } from "@/utils/auth";
import ClientPagesLayout from "@/components/layouts/ClientPagesLayout";

export default async function Home() {
  const user = await authUser();

  return (
    <>
      <ClientPagesLayout>
        <Banner />
        <Latest userId={user?._id.toString()} />
        <Promote />
        <Articles />
      </ClientPagesLayout>
    </>
  );
}
