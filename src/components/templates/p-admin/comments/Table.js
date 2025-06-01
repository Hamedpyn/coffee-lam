"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function DataTable({ comments, bannedInfo, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    Swal.fire({ title: body });
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

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comment/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      Swal.fire({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comment/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      Swal.fire({
        title: "کامنت مورد نظر با موفقیت رد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };
  const editComment = async (commentID, body) => {
    const { value: formValues } = await Swal.fire({
      title: "ویرایش کامنت",
      html: `
            <input id="swal-input-edit" class="swal2-input" placeholder="ویرایش کامنت" value="${body}" />
          `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "ذخیره",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const comment = document.getElementById("swal-input-edit").value.trim();
        if (!comment) {
          Swal.showValidationMessage("کامنت نمی‌تواند خالی باشد");
          return false;
        }
        return { comment };
      },
    });


    if (formValues) {
      const { comment } = formValues;

      Swal.fire({
        title: "آیا از ویرایش کامنت اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "آره",
        cancelButtonText: "نه",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/comment/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: commentID, body: comment }),
          });

          if (res.status === 200) {
            Swal.fire({
              title: "کامنت با موفقیت ویرایش شد",
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
  const deleteComment = async (commentID) => {
    const res = await fetch("/api/comments", {
      method: "DELETE",
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      Swal.fire({
        title: "کامنت مورد نظر با موفقیت رد شد",
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
              <th>کاربر</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید / رد</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td
                  className={comment.isAccept ? styles.accept : styles.reject}
                >
                  {index + 1}
                </td>
                <td>{comment.username}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}
                    onClick={() => editComment(comment._id, comment.body)}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}
                    onClick={() => deleteComment(comment._id)}>

                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  {isUserBanned(comment.user) ? (
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
                      onClick={() => banUser(comment.user.userName, comment.user.email)}
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
