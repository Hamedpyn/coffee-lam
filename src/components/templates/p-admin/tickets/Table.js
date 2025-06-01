"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function DataTable({ tickets, title, bannedInfo }) {
  const router = useRouter();


  const showTicketBody = (body) => {
    Swal.fire({
      title: body,
    })
  };
  const isUserBanned = (user) => {
    return bannedInfo.some(
      (b) => b.email === user.email || b.userName === user.userName
    );
  };
  const banUser = async (userName, email) => {
    Swal.fire({
      title: "آیا از بن کردن کاربر اطمینان دارین؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "آره",
      cancelButtonText: "نه",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/auth/me/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userName, email })
        });
        if (res.status === 200) {
          Swal.fire({
            title: "کاربر با موفقیت بن شد",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => router.refresh());
        }
      }
    });
  };
  const answerToTicket = async (ticketID) => {
    const { value: formValues } = await Swal.fire({
      title: "پاسخ به تیکت",
      html: `
        <input id="swal-input-answer" class="swal2-input" placeholder="پاسخ به تیکت" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "ذخیره",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const answerTicket = document.getElementById("swal-input-answer").value.trim();
        if (!answerTicket) {
          Swal.showValidationMessage("نام کاربری نمی‌تواند خالی باشد");
          return false;
        }
        return { answerTicket };
      },
    });


    if (formValues) {
      const { answerTicket } = formValues;

      Swal.fire({
        title: "آیا از فرستادن پیام اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "آره",
        cancelButtonText: "نه",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/ticket/${ticketID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: answerTicket }),
          });

          if (res.status === 200) {
            Swal.fire({
              title: "پاسخ با موفقیت فرستاده شد",
              icon: "success",
              confirmButtonText: "فهمیدم",
            }).then(() => router.refresh());
          } else {
            Swal.fire("خطا", "مشکلی پیش آمد", "error");
          }
        }
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
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.userName}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => answerToTicket(ticket._id)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  {isUserBanned(ticket.user) ? (
                    <button
                      type="button"
                      className={`${styles.ban_btn} ${styles.banned}`}
                      disabled
                    >
                      بن شده
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.ban_btn}
                      onClick={() => banUser(ticket.user.userName, ticket.user.email)}
                    >
                      بن
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
