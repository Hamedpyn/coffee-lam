import React from "react";
import styles from "@/styles/forget-password.module.css";
import Link from "next/link";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <>
      <div className={styles.forgot_password}>
        <div data-aos="fade-up" className={`w-full !px-2 lg:w-1/2`}>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل / شماره موبایل"
            />
            <button style={{ marginTop: "1rem" }} className={styles.btn}>
              بازنشانی رمزعبور
            </button>
            <Link href={"/login-register"} className={styles.back_to_login}>
              برگشت به ورود
            </Link>
          </div>
          <Link href={"/login-register"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </div>
        <section className="hidden lg:block" style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/images/coffee-brain-caffeine-neuroscincces.webp"
            alt="Coffee and brain illustration"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
