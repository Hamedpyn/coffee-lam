"use client"
import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({ _id, price, score, name, userId, img }) => {
  const router = useRouter()
  const setInWishList = async () => {

    const res = await fetch('/api/wishList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userId,
        product: _id
      })
    })
    if (res.status === 201) {
      Swal.fire({
        title: "موفق",
        text: "عملیات با موفقیت انجام شد",
        icon: "success"
      })
    } else if (res.status === 404) {
      Swal.fire({
        title: "ناموفق",
        text: "کاربر یا آیتم مورد نظر در دیتابیس موجود نمیباشد",
        icon: "error"
      });
    } else if (res.status === 409) {
      Swal.fire({
        title: "ناموفق",
        text: "آیتم در لیست علاقه مندی شما موجود میباشد.",
        icon: "error"
      });
    }

  };
  const setInBasket = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const isInBasket = cart.findIndex(item => item.id === _id);

    if (isInBasket !== -1) {
      cart[isInBasket].count += count;
    } else {
      const newItem = {
        id: _id,
        name,
        price,
        img,
        count: 1,
      };
      cart.push(newItem);
    }
    Swal.fire({
      title: "موفق",
      text: "عملیات با موفقیت انجام شد",
      icon: "success"
    }).then(result => {
      if(result.isConfirmed){
        router.push("/cart")
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart));
  };
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <div className={styles.image_wrapper}>
          <Image
            src={img}
            alt="Product Image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>


        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div onClick={setInWishList}>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button onClick={setInBasket}>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${_id}`}>
          {name}
        </Link>
        <div>
          {Array.from({ length: score }).map((e, i) => (
            <FaStar key={i} />
          ))}
          {Array.from({ length: 5 - score }).map((e, i) => (
            <FaRegStar key={i} />
          ))}
        </div>
        <span>{price.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
