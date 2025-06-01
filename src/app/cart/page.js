import ClientPagesLayout from "@/components/layouts/ClientPagesLayout";
import Stepper from "@/components/modules/stepper/Stepper";
import Basket from "@/components/templates/cart/Basket";

const page = () => {
  return (
    <ClientPagesLayout>
      <Stepper step="cart" />
      <Basket />
    </ClientPagesLayout>
  );
};

export default page;
