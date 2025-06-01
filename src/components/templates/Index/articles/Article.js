import { MdOutlineSms } from "react-icons/md";
import styles from "./article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

const Card = () => {
  return (
    <div className={styles.card}>
      <Link className={styles.img_container} href={"/"}>
        <Image
          src="/images/-قهوه-با-شیر-qi8xuncj4ordgstrl43mbg5jfj1ezzamf6v9rnitn0.jpg"
          alt="مصرف قهوه با شیر"
          fill
          sizes="(max-width: 768px) 100px, 150px"
          className={styles.image}
        />
      </Link>
      <div className={styles.date}>
        <span>24</span>
        <span>بهمن</span>
      </div>
      <div className={styles.details}>
        <span className={styles.tag}>قهوه</span>
        <Link href={"/"} className={styles.title}>
          مصرف قهوه با شیر برای کاهش التهاب
        </Link>
        <div>
          <p>نویسنده</p>
          <Image
          width={60}
          height={37}
            src="/images/665a1a4dc7cc052eaa938253ef413a78.jpg"
            alt=""
          />
          <p>Mohebi</p>
          <div>
            <MdOutlineSms />
            <span>0</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
              <Link href={"/"}>
                <FaTelegram />
              </Link>
              <Link href={"/"}>
                <FaLinkedinIn />
              </Link>
              <Link href={"/"}>
                <FaPinterest />
              </Link>
              <Link href={"/"}>
                <FaTwitter />
              </Link>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
