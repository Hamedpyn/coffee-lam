import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ comments, title, user }) => {

  return (
    <div>
      <p>نظرات ({comments.filter(comment => comment.isAccept).length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {title}
          </p>
          <div>
            {comments.map(comment => (
              comment.isAccept && <Comment key={comment._id} {...comment} />
            ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm user={user} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
