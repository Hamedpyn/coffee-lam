import Link from "next/link";
import Order from "./Order";
import styles from "./orders.module.css";
import { FaArrowLeft } from "react-icons/fa6";

const Orders = ({ orders }) => {
  return (
    <div className={`!w-full md:!w-1/2 ${styles.content}`}>
      <div className={styles.content_details}>
        <p>سفارش های اخیر</p>
        <Link href="/p-user/orders">
          همه سفارش ها <FaArrowLeft />
        </Link>
      </div>
      {orders.length > 0 &&
        orders.map(order =>
          order.product.map((product) => (
            <Order key={product._id} date={order.date} {...product} />
          ))
        )
      }

      {orders.length === 0 && (
        <p className={styles.empty}>سفارشی ثبت نشده</p>
      )}

    </div>
  );
};

export default Orders;
