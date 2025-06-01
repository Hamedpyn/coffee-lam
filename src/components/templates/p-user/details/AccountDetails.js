"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Image from "next/image";

function AccountDetails() {


  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [img, setImg] = useState("");

  const getUser = useCallback(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(me => {
        setName(me.userName);
        setEmail(me.email);
        setProfile(me.img);
      });
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const isValidName = (userName) => (userName || "").trim().length > 0;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidName(userName) && isValidEmail(email);

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("img", img);

    const res = await fetch("/api/auth/me", {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      const result = await Swal.fire({
        title: "عملیات با موفقیت انجام شد",
        icon: "success",
        confirmButtonText: "اوکی",
      });

      if (result.isConfirmed) {
        location.reload()
      }
    }


  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={userName}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
                style={{
                  border: userName
                    ? isValidName(userName)
                      ? "2px solid lightgreen"
                      : "2px solid red"
                    : undefined,
                }}
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
                style={{
                  border: email
                    ? isValidEmail(email)
                      ? "2px solid lightgreen"
                      : "2px solid red"
                    : undefined,
                }}
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              {!profile ? <Image width={200} height={200} src={"/images/unknown-person-icon-4.png"} alt="" /> : <Image width={200} height={200} src={profile} alt="" />}

              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input
                    onChange={(e) => setImg(e.target.files[0])}
                    type="file" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>

          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          disabled={!isFormValid}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;
