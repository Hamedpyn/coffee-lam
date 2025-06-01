"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function DataTable({ products, title }) {
  const router = useRouter();

  const deleteProduct = async (productID) => {
    const res = await fetch(`/api/products/${productID}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      Swal.fire({
        title: "محصول مورد نظر با موفقیت حذف شد",
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
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>

                <td>
                  <button type="button" onClick={() => deleteProduct(product._id)} className={styles.delete_btn}>
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
