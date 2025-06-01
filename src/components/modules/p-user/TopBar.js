"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Modal from "./Modal";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";

const Topbar = ({ setIsOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [me, setMe] = useState('')


  const getUser = useCallback(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(result => setMe(result));
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);


  const hideModal = () => setShowModal(false);
  return (
    <>
      <div className={styles.topbar}>
        <div className={`!hidden lg:!flex ${styles.profile}`}>
          <div>
            <p>{me.userName}</p>
            <span>{me.role === "USER" ? "کاربر" : "مدیر"}</span>
          </div>
          {!me.img ? <Image width={50} height={30} src={"/images/unknown-person-icon-4.png"} alt="" /> : <Image width={50} height={30} src={me.img} alt="" />}
        </div>

        <section className="flex lg:inline-block lg:w-auto w-full justify-between items-center">
          <div>
            <button className={`!block lg:!hidden ${styles.sidebar_toggle}`} onClick={() => setIsOpen(true)}>
              <HiMenuAlt3 />
            </button>
          </div>

          <div className={`hidden lg:inline-block ${styles.searchBox}`}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div
            onClick={() => setShowNotifications(true)}
            className={styles.notification}
          >
            <IoIosNotifications />
            <span>0</span>
          </div>
        </section>
      </div>

      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>

            {/* if we dont have any notif we show : */}
            {/* <div>
              <span>پیفامی وجود ندارد</span>
              <IoClose onClick={() => setShowNotifications(false)}/>
            </div> */}
          </section>
        </div>
      )}
      {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className={styles.modal_text}>عالی هستی ادمین عزیز</p>
        </Modal>
      )}
    </>
  );
};

export default Topbar;
