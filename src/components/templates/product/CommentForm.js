"use client";
import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

const CommentForm = ({ user }) => {
  const { id: productID } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(0);
  const [hoveredScore, setHoveredScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  const registerComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSaveUserInfo) {
      const userInfo = { username, email }
      localStorage.setItem("userInfos", JSON.stringify(userInfo))
    }

    const res = await fetch("/api/comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, body, score, productID, user }),
    });

    setLoading(false); //

    if (!user) {
      Swal.fire({
        title: "ناموفق",
        text: "به حساب خود وارد شوید.",
        icon: "error",
      });
    } else if (res.status === 201) {
      await Swal.fire({
        title: "موفق",
        text: "عملیات با موفقیت انجام شد",
        icon: "success",
      });
      setUsername("");
      setEmail("");
      setBody("");
      setScore(0);
      setHoveredScore(0);
    } else if (res.status === 422) {
      Swal.fire({
        title: "ناموفق",
        text: "اطلاعات وارد شده ناقص است",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem("userInfos"))
    if (userInfos) {
      setUsername(userInfos.username)
      setEmail(userInfos.email)
    }
  }, [])


  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    body.trim() !== "" &&
    score > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>

      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          {[5, 4, 3, 2, 1].map((star) => (
            <IoMdStar
              key={star}
              onClick={() => setScore(star)}
              onMouseEnter={() => setHoveredScore(star)}
              onMouseLeave={() => setHoveredScore(0)}
              style={{
                color: star <= (hoveredScore || score) ? "orange" : "gray",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label>
          دیدگاه شما<span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required
        ></textarea>
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label>
            نام<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.group}>
          <label>
            ایمیل<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" id="saveInfo" value={isSaveUserInfo} onChange={e => setIsSaveUserInfo(e.target.checked)} />
        <p>
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.
        </p>
      </div>

      <button
        onClick={registerComment}
        disabled={!isFormValid || loading}
        style={{
          opacity: isFormValid && !loading ? 1 : 0.5,
          cursor: isFormValid && !loading ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "در حال ارسال..." : "ثبت"}
      </button>
    </div>
  );
};

export default CommentForm;
