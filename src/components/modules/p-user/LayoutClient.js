"use client";
import React, {  useState } from "react";
import Sidebar from "@/components/modules/p-user/Sidebar";
import TopBar from "@/components/modules/p-user/TopBar";
import styles from "@/components/layouts/userPanelLayout.module.css";

const LayoutClient = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.section}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.contents}>
        <TopBar setIsOpen={setIsOpen} />
        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutClient;
