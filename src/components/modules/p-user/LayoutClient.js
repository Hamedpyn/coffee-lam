"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/modules/p-user/Sidebar";
import TopBar from "@/components/modules/p-user/TopBar";
import styles from "@/components/layouts/userPanelLayout.module.css";

const LayoutClient = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [me, setMe] = useState({});

  const getUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    const userIsLoggedIn = {
      userName: data.user.userName,
      role: data.user.role,
      img: data.user.img,
    };

    localStorage.setItem("userIsLoggedIn", JSON.stringify(userIsLoggedIn));
    window.dispatchEvent(new Event("userDetailsChanged")); // trigger update
  };

  const loadUserFromStorage = () => {
    const userDetails = JSON.parse(localStorage.getItem("userIsLoggedIn")) || {};
    setMe(userDetails);
  };

  useEffect(() => {
    getUser(); // fetch and save
    loadUserFromStorage(); // load into state

    // Listen to changes
    window.addEventListener("userDetailsChanged", loadUserFromStorage);

    return () => {
      window.removeEventListener("userDetailsChanged", loadUserFromStorage);
    };
  }, []);

  return (
    <div className={styles.section}>
      <Sidebar me={me} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.contents}>
        <TopBar me={me} setIsOpen={setIsOpen} />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutClient;
