"use client"
import { useEffect, useState } from "react";
import styles from "./register.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = ({ showLoginForm }) => {
  const [userName, setUserName] = useState("");
  const [checkedUserName, setCheckedUserName] = useState(false);
  const [isTouchedUserName, setUserNameTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState(false);
  const [isTouchedPassword, setPasswordTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [isTouchedEmail, setEmailTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const router = useRouter()

  const userSignUpConfirmation = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    const res = await fetch("/api/auth/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userName, email, password })
    })
    if (res.status === 201) {
      const { userName, role, img } = await res.json();

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
    } else if (res.status === 403) {
      Swal.fire({
        title: "ناموفق",
        text: "نام کاربری / ایمیل مورد استفاده توسط شما , توسط وبسایت ما بن شده است",
        icon: "error"
      });
    } else if (res.status === 409) {
      Swal.fire({
        title: "ناموفق",
        text: "کاربر با این اطلاعات در وبسایت ما وجود دارد. دوباره تلاش کنید",
        icon: "error"
      });
    }
  };


  useEffect(() => {
    const isUserNameValid = userName.trim().length > 0;
    const isPasswordValid = password.trim().length >= 8;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setCheckedUserName(isUserNameValid);
    setCheckedPassword(isPasswordValid);
    setCheckedEmail(isEmailValid);

    setFormIsValid(isUserNameValid && isPasswordValid && isEmailValid);
  }, [userName, password, email]);


  return (
    <>
      <div className={styles.form}>
        <input
          onBlur={() => setUserNameTouched(true)}
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className={`${styles.input} 
          ${isTouchedUserName
              ? checkedUserName
                ? styles.input_valid
                : styles.input_invalid
              : ''
            }
          `}
          type="text" placeholder="نام" />

        <input
          onBlur={() => setEmailTouched(true)}
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`${styles.input} ${isTouchedEmail
            ? checkedEmail
              ? styles.input_valid
              : styles.input_invalid
            : ''
            }`}
          type="email"
          placeholder="ایمیل"
        />
        <input
          onBlur={() => setPasswordTouched(true)}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`${styles.input} ${isTouchedPassword
            ? checkedPassword
              ? styles.input_valid
              : styles.input_invalid
            : ''
            }`}
          type="password"
          placeholder="رمز عبور"
        />

        <button onClick={userSignUpConfirmation} style={{ marginTop: ".7rem" }} disabled={!formIsValid} className={styles.btn}>
          ثبت نام
        </button>
        <p className={styles.back_to_login} onClick={() => showLoginForm()}>برگشت به ورود</p>
      </div>
      <Link href={'/'} className={styles.redirect_to_home}>لغو</Link>

    </>
  );
};

export default Register;
