"use client"
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = ({ showRegisterForm }) => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [identifierChecker, setIdentifierChecker] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [identifierTouched, setIdentifierTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    setIdentifierChecker(identifier.trim().length > 0);
    setPasswordChecker(password.length >= 8);

    if (identifier.trim().length > 0 && password.length >= 8) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [identifier, password]);

  const userLoginConfirmation = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password, rememberMe })
    });

    if (res.status === 200) {
      const { userName, role,img } = await res.json();

      const userIsLoggedIn = {
        userName,
        role,
        img
      }

      localStorage.setItem("userIsLoggedIn", JSON.stringify(userIsLoggedIn))

      Swal.fire({
        title: "موفق",
        text: "عملیات با موفقیت انجام شد",
        icon: "success"
      }).then(() => {
        router.push('/')
      });
    } else if (res.status === 422) {
      Swal.fire({
        title: "ناموفق",
        text: "اطلاعات وارد شده اشتباه است",
        icon: "error"
      });
    } else if (res.status === 404) {
      Swal.fire({
        title: "ناموفق",
        text: "ایمیل / نام کاربری اشتباه است.",
        icon: "error"
      });
    } else if (res.status === 403) {
      Swal.fire({
        title: "ناموفق",
        text: "نام کاربری / ایمیل مورد استفاده توسط شما , توسط وبسایت ما بن شده است",
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className={styles.form}>
        <input
          className={` ${styles.input} ${identifierTouched
            ? identifierChecker
              ? styles.input_valid
              : styles.input_invalid
            : ''
            }`}
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          onBlur={() => setIdentifierTouched(true)}
          placeholder="ایمیل یا نام کاربری"
        />

        <input
          className={`${styles.input} ${passwordTouched
            ? passwordChecker
              ? styles.input_valid
              : styles.input_invalid
            : ''
            }`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordTouched(true)}
          placeholder="رمز عبور"
        />

        <div className={styles.checkbox}>
          <input
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            type="checkbox"
          />
          <p>مرا به یاد داشته باش</p>
        </div>

        <button
          onClick={userLoginConfirmation}
          disabled={!formIsValid}
          className={styles.btn}
        >
          ورود
        </button>

        <Link href={"/forget-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده اید؟
        </Link>

        <span>آیا حساب کاربری ندارید؟</span>
        <button className={styles.btn_light} onClick={() => showRegisterForm()}>
          ثبت نام
        </button>
      </div>

      <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
    </>
  );
};

export default Login;
