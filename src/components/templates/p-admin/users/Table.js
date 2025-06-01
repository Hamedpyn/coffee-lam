"use client";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


export default function DataTable({ users, bannedInfo }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    const res = await fetch(`/api/auth/me/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: true }),
    });
    if (res.status === 200) {
      new Swal({
        title: "نقش کاربر با موفقیت تغییر یافت",
        icon: "success",
        confirmButtonText: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {

    Swal.fire({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "آره",
      cancelButtonText: "نه",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/auth/me/${userID}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          Swal.fire({
            title: "کاربر با موفقیت حذف شد",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => router.refresh()
          );
        }
      }
    });

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
  const changeUserDetails = async (userName, email,userID) => {

    const { value: formValues } = await Swal.fire({
      title: "ویرایش اطلاعات کاربر",
      html: `
    <input id="swal-input-username" class="swal2-input" placeholder="نام کاربری" value="${userName}" />
    <input id="swal-input-email" class="swal2-input" placeholder="ایمیل" value="${email}" />
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "ذخیره",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const userName = document.getElementById("swal-input-username").value.trim();
        const email = document.getElementById("swal-input-email").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 
        if (!userName) {
          Swal.showValidationMessage("نام کاربری نمی‌تواند خالی باشد");
          return false;
        }

        if (!emailPattern.test(email)) {
          Swal.showValidationMessage("ایمیل نامعتبر است");
          return false;
        }

        return { userName, email };
      },
    });


    if (formValues) {
      const { userName, email } = formValues;

      Swal.fire({
        title: "آیا از ذخیره تغییرات اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "آره",
        cancelButtonText: "نه",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/auth/me/${userID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, email }),
          });

          if (res.status === 200) {
            Swal.fire({
              title: "اطلاعات با موفقیت تغییر کرد",
              icon: "success",
              confirmButtonText: "فهمیدم",
            }).then(() => router.refresh());
          } else {
            new Swal.fire("خطا", "مشکلی پیش آمد", "error");
          }
        }
      });
    }
  };
  const isUserBanned = (user) => {
    return bannedInfo.some(
      (b) => b.email === user.email || b.userName === user.userName
    );
  };


  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>لیست کاربران</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button type="button" className={styles.edit_btn}
                    onClick={() => changeUserDetails(user.userName, user.email,user._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  {isUserBanned(user) ? (
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
                      onClick={() => banUser(user.userName, user.email)}
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
