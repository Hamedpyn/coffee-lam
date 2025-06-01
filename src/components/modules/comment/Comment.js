import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
import Image from "next/image";
const Comment = (props) => {
  return (
    <section className={styles.comment}>
      <Image width={60} height={37} src={props.img} className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{props.username}</strong>
            <p>۲۸ آذر ۱۴۰۱</p>
          </div>
          <div className={styles.stars}>
            {Array.from({ length: props.score }).map((e, i) => (
              <FaStar key={i} />
            ))}
            {Array.from({ length: 5 - props.score }).map((e, i) => (
              <FaRegStar key={i} />
            ))}
          </div>
        </div>
        <p>
          {props.body}
        </p>
      </div>
    </section>
  );
};

export default Comment;
