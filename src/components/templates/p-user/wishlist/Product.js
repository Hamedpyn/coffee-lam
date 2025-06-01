"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Card = ({ price, score, name, productID, img, count, id }) => {

  const router = useRouter()

  const removeProduct = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "آره",
      cancelButtonText: "نه",
    }).then(async (result) => {
      if (result.isConfirmed && !count) {
        const res = await fetch(`/api/wishList/${productID}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          Swal.fire({
            title: "محصول با موفقیت از علاقه مندی‌ها حذف شد",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => router.refresh());
        }
      } else {
        const res = await fetch(`/api/order/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: productID,
            count,
          }),
        });

        if (res.status === 200) {
          Swal.fire({
            title: "محصول با موفقیت از لیست سفارشات حذف شد",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => router.refresh());
        }
      }
    })

  }
  return (
    <div className={styles.card}>
      <Link href={`/product/${productID}`}>
        <Image
          width={283}
          height={283}
          src={img}
          alt="product image"
        />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <IoMdStar key={index} />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{price.toLocaleString()} تومان {count ? `× ${count}` : ""}</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
