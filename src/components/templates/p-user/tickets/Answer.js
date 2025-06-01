import Image from "next/image";
import styles from "./answer.module.css";

const Answer = ({ type, body, createdAt, answer, user }) => {
  return (
    <section
      className={type === "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <div>
          <div>
            <p>{type === "user" ? user.userName : answer[0].userName}</p>
            <span>{type === "user" ? "کاربر" : "مدیر"}</span>
          </div>

          {type === user ? <Image width={115} height={80} src="/images/shahin.jpg" alt="" /> : <Image width={115} height={80} src="/images/665a1a4dc7cc052eaa938253ef413a78.jpg" alt="" />}

        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{type === "user" ? body : answer[0].body}</p>
      </div>
    </section>
  );
};

export default Answer;
