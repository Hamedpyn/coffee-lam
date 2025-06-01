"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function SentTicket() {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState("-1");
  const [subDepartmentID, setSubDepartmentID] = useState("-1");
  const [priority, setPriority] = useState(-1);

  const [touched, setTouched] = useState({
    title: false,
    body: false,
    department: false,
    subDepartment: false,
    priority: false,
  });

  const [validity, setValidity] = useState({
    title: false,
    body: false,
    department: false,
    subDepartment: false,
    priority: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  useEffect(() => {
    if (departmentID !== "-1") {
      fetch(`/api/departments/sub/${departmentID}`)
        .then((res) => res.json())
        .then((data) => setSubDepartments(data));
    }
  }, [departmentID]);

  // Validation effect
  useEffect(() => {
    setValidity({
      title: title.trim() !== "",
      body: body.trim() !== "",
      department: departmentID !== "-1",
      subDepartment: subDepartmentID !== "-1",
      priority: priority !== -1,
    });
  }, [title, body, departmentID, subDepartmentID, priority]);

  useEffect(() => {
    setIsFormValid(
      validity.title &&
      validity.body &&
      validity.department &&
      validity.subDepartment &&
      validity.priority
    );
  }, [validity]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getBorderStyle = (field) => {
    if (!touched[field]) return {};
    return {
      border: `2px solid ${validity[field] ? "lightgreen" : "red"}`,
    };
  };

  const sendTicket = async () => {
    const ticket = {
      title,
      body,
      department: departmentID,
      subDepartment: subDepartmentID,
      priority: Number(priority),
    };

    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (res.status === 200) {
      new Swal({
        title: "تیکت شما با موفقیت ثبت شد",
        icon: "success",
        confirmButtonText: "مشاهده تیکت‌ها",
      }).then(() => {
        router.push("/p-user/tickets");
      });
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets">همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select
            value={departmentID}
            onChange={(e) => setDepartmentID(e.target.value)}
            onBlur={() => handleBlur("department")}
            style={getBorderStyle("department")}
          >
            <option value="-1">لطفا دپارتمان را انتخاب نمایید</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>{d.title}</option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>نوع تیکت را انتخاب کنید:</label>
          <select
            value={subDepartmentID}
            onChange={(e) => setSubDepartmentID(e.target.value)}
            onBlur={() => handleBlur("subDepartment")}
            style={getBorderStyle("subDepartment")}
          >
            <option value="-1">لطفا یک مورد را انتخاب نمایید</option>
            {subDepartments.map((sd) => (
              <option key={sd._id} value={sd._id}>{sd.title}</option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
            placeholder="عنوان.."
            style={getBorderStyle("title")}
          />
        </div>

        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            onBlur={() => handleBlur("priority")}
            style={getBorderStyle("priority")}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید</option>
            <option value={1}>کم</option>
            <option value={2}>متوسط</option>
            <option value={3}>بالا</option>
          </select>
        </div>

        <div className={`md:!col-span-2 ${styles.group}`}>
          <label>محتوای تیکت را وارد نمایید:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onBlur={() => handleBlur("body")}
            rows={10}
            style={getBorderStyle("body")}
          />
        </div>
      </div>

      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button
        className={styles.btn}
        onClick={sendTicket}
        disabled={!isFormValid}
      >
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}

export default SentTicket;
