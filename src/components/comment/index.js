import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import dateFormat from "../../utils/date-format";

function Comment({ comment, t, replyToComment, lang }) {
  const cn = bem("Comment");
  return (
    <div className={cn()}>
      <div className={cn("author")}>
        {comment.author.profile.name}
        <span className={cn("date")}>
          {dateFormat(comment.dateCreate, lang)}
        </span>
      </div>
      <div className={cn("text")}>{comment.text}</div>
      <button onClick={replyToComment(comment._id)} className={cn("reply")}>
        {t("comments.reply")}
      </button>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,

    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }).isRequired,
  replyToComment: PropTypes.func,
  t: PropTypes.func,
  lang: PropTypes.string,
};

Comment.defaultProps = {
  replyToComment: () => {},
  t: (text) => text,
};

export default memo(Comment);
