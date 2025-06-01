"use client";
import { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function AddDiscount() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");

  const [blurredFields, setBlurredFields] = useState({
    code: false,
    percent: false,
    maxUse: false,
  });

  const handleBlur = (field) => {
    setBlurredFields((prev) => ({ ...prev, [field]: true }));
  };

  const getInputClass = (field, value) => {
    if (!blurredFields[field]) return "";

    const trimmed = value.trim();

    if (trimmed === "") return styles.redBorder;

    if (field === "percent") {
      const num = Number(trimmed);
      if (isNaN(num) || num < 0 || num > 100) return styles.redBorder;
    }

    return styles.greenBorder;
  };


  const addDiscount = async () => {
    const discount = { code, percent, maxUse };

    const res = await fetch("/api/off", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discount),
    });

    if (res.status === 201) {
      Swal.fire({
        title: "کد تخفیف با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        setCode("");
        setPercent("");
        setMaxUse("");
        setBlurredFields({ code: false, percent: false, maxUse: false });
        router.refresh();
      });
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>شناسه تخفیف</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onBlur={() => handleBlur("code")}
            className={getInputClass("code", code)}
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>درصد تخفیف</label>
          <input
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            onBlur={() => handleBlur("percent")}
            className={getInputClass("percent", percent)}
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="number"
          />
        </div>
        <div>
          <label>حداکثر استفاده</label>
          <input
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
            onBlur={() => handleBlur("maxUse")}
            className={getInputClass("maxUse", maxUse)}
            placeholder="حداکثر استفاده از کد تخفیف"
            type="number"
          />
        </div>
      </div>
      <button onClick={addDiscount}>افزودن</button>
    </section>
  );
}

export default AddDiscount;
