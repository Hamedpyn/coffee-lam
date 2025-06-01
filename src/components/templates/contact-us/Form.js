"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    name.trim().length > 0 &&
    isEmailValid(email) &&
    company.trim().length > 0 &&
    phone.trim().length >= 0 &&
    message.trim().length > 0;

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, phone, message }),
    });

    setLoading(false);

    if (res.status === 201) {
      await Swal.fire({
        title: "موفق",
        text: "پیام شما با موفقیت ارسال شد.",
        icon: "success",
      });
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setMessage("");
    } else if (res.status === 422) {
      Swal.fire({
        title: "خطا",
        text: "اطلاعات وارد شده ناقص است.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "خطا",
        text: "ارسال پیام با مشکل مواجه شد.",
        icon: "error",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={submitMessage}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می‌توانید فرم زیر را تکمیل کنید</p>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        style={{
          opacity: isFormValid && !loading ? 1 : 0.5,
          cursor: isFormValid && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "در حال ارسال..." : "ارسال"}
      </button>
    </form>
  );
};

export default Form;
