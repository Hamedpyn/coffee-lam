import Link from "next/link";
import styles from "./order.module.css";

const Order = (props) => {
  console.log(props);

  return (
    <Link href={`/product/${props.id._id}`} className={styles.card}>
      <div>
        <div>
          <p>{props.id.name}</p>
          <img
            src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
            alt=""
          />
        </div>
        <p>تکمیل شده</p>
      </div>
      <div className="flex flex-col items-end">
        <p>{new Date(props.date).toLocaleDateString("fa-IR")}</p>
        <p className={styles.price}>{props.id.price.toLocaleString()} تومان {props.count ? `× ${props.count}` : ""}</p>

      </div>
    </Link>
  );
};

export default Order;
