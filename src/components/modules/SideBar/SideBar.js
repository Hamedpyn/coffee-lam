"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { IoChevronBackOutline } from "react-icons/io5";

export default function SideBar(sideBarObject) {
  const path = usePathname();
  const wrapperRef = useRef();
  const [, setWidth] = useState(0);
  const bodyRef = useRef(null);
  const sideBarRef = useRef(null);
  const [subMenu, setSubMenu] = useState(false);

  useEffect(() => {
    bodyRef.current = document.body;
    const handleClick = (e) => {
      if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
        sideBarObject.setIsTrue(false);
      }
    };
    if (sideBarObject.isTrue) {
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
  }, [sideBarObject, sideBarObject.isTrue]);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth >= 921) {
        sideBarObject.setIsTrue(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sideBarObject]);

  return (
    <>
      <div
        ref={sideBarRef}
        className={`z-50 fixed top-0 left-0 transition-all ease-out duration-300 h-full w-[270px] sm:w-[350px] bg-white overflow-auto overflow-x-hidden lg:invisible lg:opacity-0 ${
          sideBarObject.isTrue
            ? "translate-x-0 visible opacity-100"
            : "-translate-x-full invisible opacity-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Search */}
          <div className="shadow-menu !px-4 !py-5 flex justify-center items-center flex-row-reverse">
            <input
              type="text"
              placeholder="جستجوی محصولات"
              className="w-full text-base text-black border-0 focus:outline-none focus:ring-0 focus:border-transparent text-right"
            />
            <CiSearch className="text-black/85 text-3xl" />
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <ul className="py-2">
              <li className="!px-4 text-right border-b border-gray-300/80">
                <Link
                  href="/"
                  className="h-full !py-4 block text-sm"
                  style={{ color: path === "/" ? "#711D1C" : "#34180e" }}
                >
                  صفحه اصلی
                </Link>
              </li>
              <li className="!px-4 text-right border-b border-gray-300/80">
                <Link
                  href="/category"
                  className="h-full !py-4 block text-sm"
                  style={{
                    color: path.startsWith("/category") ? "#711D1C" : "#34180e",
                  }}
                >
                  فروشگاه
                </Link>
              </li>
              
              <li className="!px-4 text-right border-b border-gray-300/80">
                <Link
                  href="/contact-us"
                  className="h-full !py-4 block text-sm"
                  style={{
                    color:
                      path.startsWith("/contact-us") ? "#711D1C" : "#34180e",
                  }}
                >
                  تماس با ما
                </Link>
              </li>
              <li className="!px-4 text-right border-b border-gray-300/80">
                <Link
                  href="/about-us"
                  className="h-full !py-4 block text-sm"
                  style={{
                    color: path.startsWith("/about-us") ? "#711D1C" : "#34180e",
                  }}
                >
                  درباره ما
                </Link>
              </li>
              <li className="!px-4 text-right border-b border-gray-300/80">
                <Link
                  href="/rules"
                  className="h-full !py-4 block text-sm"
                  style={{
                    color: path.startsWith("/rules") ? "#711D1C" : "#34180e",
                  }}
                >
                  قوانین
                </Link>
              </li>
              {!sideBarObject.isLogin ? (
                <li className="!px-4 text-right border-b border-gray-300/80">
                  <Link
                    href="/login-register"
                    className="h-full !py-4 block text-sm"
                    style={{
                      color:
                        path.startsWith("/login-register")
                          ? "#711D1C"
                          : "#34180e",
                    }}
                  >
                    ورود / عضویت
                  </Link>
                </li>
              ) : (
                <>
                  <li
                    onClick={() => setSubMenu((prev) => !prev)}
                    className="!px-4 !py-4 text-right border-b border-gray-300/80"
                  >
                    <div className="flex justify-between items-center flex-row-reverse">
                      <Link
                        onClick={(e) => e.stopPropagation()}
                        href="/p-user"
                        className="block text-sm"
                        style={{
                          color:
                            path === "/p-user" ? "#711D1C" : "#34180e",
                        }}
                      >
                        حساب کاربری
                      </Link>
                      <IoChevronBackOutline
                        className={`transition-all cursor-pointer text-black/85 text-xl ${
                          subMenu ? "transform -rotate-90" : ""
                        }`}
                      />
                    </div>
                    <ul
                      className={`transition-all ease-in ${
                        subMenu
                          ? "!mt-5 translate-y-0 visible opacity-100 !px-4"
                          : "translate-y-full invisible overflow-hidden opacity-0 h-0"
                      }`}
                    >
                      <li className="text-right">
                        <Link
                          href="/p-user/orders"
                          className="h-full block text-sm"
                          style={{
                            color: path.startsWith("/p-user/orders")
                              ? "#711D1C"
                              : "#34180e",
                          }}
                        >
                          سفارشات -
                        </Link>
                      </li>
                      <li className="text-right">
                        <Link
                          href="/p-user/tickets"
                          className="h-full !pt-2 block text-sm"
                          style={{
                            color: path.startsWith("/p-user/tickets")
                              ? "#711D1C"
                              : "#34180e",
                          }}
                        >
                          تیکت های پشتیبانی -
                        </Link>
                      </li>
                      <li className="text-right">
                        <Link
                          href="/p-user/comments"
                          className="h-full !pt-2 block text-sm"
                          style={{
                            color: path.startsWith("/p-user/comments")
                              ? "#711D1C"
                              : "#34180e",
                          }}
                        >
                          کامنت‌ها -
                        </Link>
                      </li>
                      <li className="text-right">
                        <Link
                          href="/p-user/wishlist"
                          className="h-full !pt-2 block text-sm"
                          style={{
                            color: path.startsWith("/p-user/wishlist")
                              ? "#711D1C"
                              : "#34180e",
                          }}
                        >
                          علاقه‌مندی‌ها -
                        </Link>
                      </li>
                      <li className="text-right">
                        <Link
                          href="/p-user/account-details"
                          className="h-full !pt-2 block text-sm"
                          style={{
                            color: path.startsWith("/p-user/account-details")
                              ? "#711D1C"
                              : "#34180e",
                          }}
                        >
                          جزئیات اکانت -
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {sideBarObject.role === "ADMIN" && (
                <li className="!px-4 text-right border-b border-gray-300/80">
                  <Link
                    href="/p-admin"
                    className="h-full !py-4 block text-sm"
                    style={{
                      color: path.startsWith("/p-admin")
                        ? "#711D1C"
                        : "#34180e",
                    }}
                  >
                    پنل مدیریت
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div ref={wrapperRef}></div>
    </>
  );
}
