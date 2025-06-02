"use client";

import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

const Sidebar = ({ isOpen, setIsOpen,me }) => {
  const path = usePathname();
  const router = useRouter();
  let wrapperRef = useRef();
  let bodyRef = useRef(null);
  let sideBarRef = useRef(null);


  useEffect(() => {
    bodyRef.current = document.body;
    const handleClick = (e) => {
      if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      wrapperRef.current.classList.add("wrapper");
      bodyRef.current.classList.add("overflow-hidden");

      bodyRef.current.addEventListener("click", handleClick);
    } else {
      wrapperRef.current.classList.remove("wrapper");
      bodyRef.current.classList.remove("overflow-hidden");
    }

    return () => {
      bodyRef.current.removeEventListener("click", handleClick);
    };
  }, [isOpen, setIsOpen]);

  const logoutHandler = () => {
    Swal.fire({
      title: "آیا از خروج از اکانت خود مطمئن هستید؟ ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "آره",
      cancelButtonText: "نه",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/auth/signout`);
        if (res.status === 200) {
          Swal.fire({
            title: "شما با موفقیت از حساب خود خارج شدید!",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => router.push("/"));
        }
      }
    });
  };

  const closeSidebar = () => setIsOpen(false);

  const isActive = (href) => path === href || path.startsWith(href + "/");

  return (
    <>
      <aside
        ref={sideBarRef}
        className={`fixed lg:static top-0 z-[99999] right-0 transition-all ease-out duration-300 h-full w-[270px] md:w-[270px] overflow-auto bg-[#711d1c] ${isOpen ? "translate-x-0 visible opacity-100" : "translate-x-full invisible opacity-0"} lg:translate-x-0 lg:visible lg:opacity-100`}
        onClick={e => e.stopPropagation()}
      >
        <div className={`!flex justify-end !border-b !border-white !p-2.5 lg:!hidden ${styles.profile}`}>
          <div>
            <p className="text-white">{me?.userName}</p>
            <span>{me?.role === "USER" ? "کاربر" : "مدیر"}</span>
          </div>
          {!me?.img ? <Image width={50} height={30} src={"/images/unknown-person-icon-4.png"} alt="" /> : <Image width={50} height={30} src={me.img} alt="" />}
        </div>

        <ul className={styles.sidebar_main} onClick={closeSidebar}>
          {path.includes("/p-user") ? (
            <>
              <Link href={"/p-user"} className={path === "/p-user" ? styles.sidebar_link_active : ""}>
                <ImReply />
                پیشخوان
              </Link>
              <Link href={"/p-user/orders"} className={isActive("/p-user/orders") ? styles.sidebar_link_active : ""}>
                <FaShoppingBag />
                سفارش ها
              </Link>
              <Link href={"/p-user/tickets"} className={isActive("/p-user/tickets") ? styles.sidebar_link_active : ""}>
                <MdSms />
                تیکت های پشتیبانی
              </Link>
              <Link href={"/p-user/comments"} className={isActive("/p-user/comments") ? styles.sidebar_link_active : ""}>
                <FaComments />
                کامنت ها
              </Link>
              <Link href={"/p-user/wishlist"} className={isActive("/p-user/wishlist") ? styles.sidebar_link_active : ""}>
                <FaHeart />
                علاقه مندی
              </Link>
              <Link href={"/p-user/account-details"} className={isActive("/p-user/account-details") ? styles.sidebar_link_active : ""}>
                <TbListDetails />
                جزئیات اکانت
              </Link>
              <Link href={"/"}>
                <MdLogout />
                بازگشت به صفحه اصلی
              </Link>
            </>
          ) : (
            <>
              <Link href={"/p-admin"} className={path === "/p-admin" ? styles.sidebar_link_active : ""}>
                <ImReply />
                پیشخوان
              </Link>
              <Link href={"/p-admin/products"} className={isActive("/p-admin/products") ? styles.sidebar_link_active : ""}>
                <FaShoppingBag />
                محصولات
              </Link>
              <Link href={"/p-admin/users"} className={isActive("/p-admin/users") ? styles.sidebar_link_active : ""}>
                <FaUsers />
                کاربران
              </Link>
              <Link href={"/p-admin/comments"} className={isActive("/p-admin/comments") ? styles.sidebar_link_active : ""}>
                <FaComments />
                کامنت ها
              </Link>
              <Link href={"/p-admin/tickets"} className={isActive("/p-admin/tickets") ? styles.sidebar_link_active : ""}>
                <MdSms />
                تیکت ها
              </Link>
              <Link href={"/p-admin/discounts"} className={isActive("/p-admin/discounts") ? styles.sidebar_link_active : ""}>
                <MdOutlineAttachMoney />
                تخفیفات
              </Link>
              <Link href={"/"}>
                <MdLogout />
                بازگشت به صفحه اصلی
              </Link>
            </>
          )}
        </ul>


        <div className={styles.logout} onClick={() => { closeSidebar(); logoutHandler(); }}>
          <MdLogout />
          خروج
        </div>
      </aside>
      <div ref={wrapperRef}></div>
    </>
  );
};

export default Sidebar;
