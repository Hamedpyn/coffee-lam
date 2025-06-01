"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";

function Navbar({ isLogin, role, userId }) {
  const [fixedTop, setFixedTop] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishListLength, setWishListLength] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    isLogin && fetch("/api/auth/refresh")
      .then(res => {
        if (res.status === 401) {
          return null;
        } else {
          router.refresh();
        }
      })
  }, []);

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      setFixedTop(currentScroll >= 120);
    };
    window.addEventListener("scroll", fixNavbarToTop);
    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/wishList/${userId}`)
      .then((res) => {
        if (res.status === 404) {
          return { data: [] };
        }
        return res.json();
      })
      .then((result) => {
        setWishListLength(result.data?.length || 0);
      })
      .catch((error) => {
        console.error('Failed to fetch wishlist:', error);
        setWishListLength(0);
      })
  }, [userId]);


  const activeClass = "text-primary font-bold";

  return (
    <nav className={fixedTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        <Link href="/">
          <div className="relative w-[150px] h-[70px]">
            <Image
              priority
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="150px"
              className="object-contain"
            />
          </div>
        </Link>

        <ul className={styles.links}>
          <li>
            <Link href="/" className={pathname === "/" ? activeClass : ""}>
              صفحه اصلی
            </Link>
          </li>
          <li>
            <Link
              href="/category"
              className={pathname.startsWith("/category") ? activeClass : ""}
            >
              فروشگاه
            </Link>
          </li>

          <li>
            <Link
              href="/contact-us"
              className={pathname === "/contact-us" ? activeClass : ""}
            >
              تماس با ما
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className={pathname === "/about-us" ? activeClass : ""}
            >
              درباره ما
            </Link>
          </li>
          <li>
            <Link
              href="/rules"
              className={pathname === "/rules" ? activeClass : ""}
            >
              قوانین
            </Link>
          </li>

          {isLogin == true ? (
            <div className={styles.dropdown}>
              <Link
                href="/p-user"
                className={pathname.startsWith("/p-user") ? activeClass : ""}
              >
                <IoIosArrowDown className={styles.dropdown_icons} />
                حساب کاربری
              </Link>
              <div className={styles.dropdown_content}>
                <Link
                  href="/p-user/orders"
                  className={
                    pathname === "/p-user/orders" ? activeClass : ""
                  }
                >
                  سفارشات
                </Link>
                <Link
                  href="/p-user/tickets"
                  className={
                    pathname === "/p-user/tickets" ? activeClass : ""
                  }
                >
                  تیکت های پشتیبانی
                </Link>
                <Link
                  href="/p-user/comments"
                  className={
                    pathname === "/p-user/comments" ? activeClass : ""
                  }
                >
                  کامنت‌ها
                </Link>
                <Link
                  href="/p-user/wishlist"
                  className={
                    pathname === "/p-user/wishlist" ? activeClass : ""
                  }
                >
                  علاقه‌مندی‌ها
                </Link>
                <Link
                  href="/p-user/account-details"
                  className={
                    pathname === "/p-user/account-details" ? activeClass : ""
                  }
                >
                  جزئیات اکانت
                </Link>
              </div>
            </div>
          ) : (
            <li>
              <Link
                href="/login-register"
                className={pathname === "/login-register" ? activeClass : ""}
              >
                ورود / عضویت
              </Link>
            </li>
          )}

          {role === "ADMIN" && (
            <li>
              <Link
                href="/p-admin"
                className={pathname.startsWith("/p-admin") ? activeClass : ""}
              >
                پنل مدیریت
              </Link>
            </li>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link
            href="/cart"
            className={pathname === "/cart" ? activeClass : ""}
          >
            <FaShoppingCart />
            <span>{cart?.length}</span>
          </Link>
          <Link
            href="/wishlist"
            className={pathname === "/wishlist" ? activeClass : ""}
          >
            <FaRegHeart />
            <span>{wishListLength}</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
