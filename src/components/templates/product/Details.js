"use client"
import { FaFacebookF, FaRegStar, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Details = ({ product, userId }) => {
  const [count, setCount] = useState(1);
  let router = useRouter("")
  const setInWishList = async () => {
    const res = await fetch('/api/wishList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userId,
        product: product._id
      })
    })
    if (res.status === 201) {
      Swal.fire({
        title: "موفق",
        text: "عملیات با موفقیت انجام شد",
        icon: "success"
      }).then(() => {
        router.push('/')
      });
    } else if (res.status === 404) {
      Swal.fire({
        title: "ناموفق",
        text: "وارد اکانت خود شوید",
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

    const isInBasket = cart.findIndex(item => item.id === product._id);

    if (isInBasket !== -1) {
      cart[isInBasket].count += count;
    } else {
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        count,
      };
      cart.push(newItem);
    }
    Swal.fire({
      title: "موفق",
      text: "عملیات با موفقیت انجام شد",
      icon: "success",
      confirmButtonText: "فهمیدم"
    }).then(result => {
      if (result.isConfirmed) {
        router.push("/cart")
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("userDetailsChanged"));
  };


  return (
    <main className={styles.detailsMain}>
      <Breadcrumb
        title={product.name}
      />
      <h2>
        {product.name}
      </h2>

      <div className={styles.rating}>
        <div>
          {Array.from({ length: product.score }).map((e, i) => (
            <FaStar key={i} />
          ))}
          {Array.from({ length: 5 - product.score }).map((e, i) => (
            <FaRegStar key={i} />
          ))}
        </div>
        <p>(دیدگاه {product.comments.filter(comment => comment.isAccept).length} کاربر)</p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>
        {product.shortDescription}
      </span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button className="text-white" onClick={setInBasket}>افزودن به سبد خرید</button>
        <div>
          <span onClick={() => setCount(prev => prev > 1 ? prev - 1 : prev)}>-</span>{count}<span onClick={() => setCount(prev => prev + 1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <div className="cursor-pointer" onClick={setInWishList}>
          <CiHeart />
          <span>افزودن به علاقه مندی ها</span>
        </div>
        <div>
          <TbSwitch3 />
          <span>مقایسه</span>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: GOLD Nespresso Compatible capsule</strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong> {product.tags.map(item => (
            <span key={item}>{item},</span>
          ))}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <Link href="/">
          <FaTelegram />
        </Link>
        <Link href="/">
          <FaLinkedinIn />
        </Link>
        <Link href="/">
          <FaPinterest />
        </Link>
        <Link href="/">
          <FaTwitter />
        </Link>
        <Link href="/">
          <FaFacebookF />
        </Link>
      </div>

      <hr />
    </main>
  );
};

export default Details;
