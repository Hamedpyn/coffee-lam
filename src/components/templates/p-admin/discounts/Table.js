"use client"
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Table({ discounts }) {
  let router = useRouter();
  const removeOffCode = async (codeID) => {
    const res = await fetch(`/api/off/${codeID}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      Swal.fire({
        title: "کد تخفیف مورد نظر با موفقیت حذف شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>لیست تخفیفات</span>
        </h1>
      </div>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده شده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, index) => (
              <tr key={discount._id}>
                <td
                  className={
                    discount.uses === discount.maxUse ? styles.red : styles.green
                  }
                >
                  {index + 1}
                </td>
                <td>{discount.code}</td>
                <td>{discount.percent}</td>
                <td>{discount.maxUse}</td>
                <td>{discount.uses}</td>
                <td>
                  <button type="button" className={styles.delete_btn}
                    onClick={() => removeOffCode(discount._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Table;
