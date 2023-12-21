import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useNavigate } from "react-router-dom";

function CommentForm({
  articleId,
  activeId,
  replyToComment,
  submitForm,
  onCancel,
  t,
  isDisabled,
  isAuth,
}) {
  const cn = bem("CommentForm");
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm({
      text: e.target.comment.value,
      parent: {
        _id: activeId,
        _type: articleId === activeId ? "article" : "comment",
      },
    });
    e.target.comment.value = "";
    replyToComment(articleId)();
  };

  const navigate = useNavigate();
  const handleClickLink = (e) => {
    e.preventDefault();
    navigate("/login", { state: { back: location.pathname } });
  };

  return isAuth ? (
    <form
      className={cn()}
      onSubmit={handleSubmit}
      style={articleId === activeId ? { marginTop: "30px" } : {}}
    >
      <label className={cn("title")} htmlFor="comment">
        {articleId === activeId
          ? t("comments.form.title")
          : t("comments.form.replyTitle")}
      </label>
      <textarea
        className={cn("textarea")}
        autoFocus={articleId !== activeId}
        id="comment"
        name="comment"
        required
        disabled={isDisabled}
      />
      <div className={cn("actions")}>
        <button type="sumbit" disabled={isDisabled}>
          {t("comments.form.sumbit")}
        </button>
        {articleId !== activeId && (
          <button type="button" onClick={onCancel} disabled={isDisabled}>
            {t("comments.form.cancel")}
          </button>
        )}
      </div>
    </form>
  ) : (
    <div
      className={cn("authText")}
      style={articleId === activeId ? { marginTop: "30px" } : {}}
    >
      <a className={cn("linkToLogin")} href="/login" onClick={handleClickLink}>
        {t("comments.form.authText.part1")}
      </a>
      {t("comments.form.authText.part2")}
      {articleId === activeId
        ? t("comments.form.authText.part3")
        : t("comments.form.authText.part3reply")}{" "}
      {articleId !== activeId && (
        <button
          className={cn("btnCancel")}
          onClick={onCancel}
          disabled={isDisabled}
        >
          {t("comments.form.cancel")}
        </button>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  replyToComment: PropTypes.func,
  onSumbit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
  isDisabled: PropTypes.bool,
  isAuth: PropTypes.bool,
};

CommentForm.defaultProps = {
  replyToComment: () => {},
  onSumbit: () => {},
  onCancel: () => {},
  t: (text) => text,
  isDisabled: false,
  isAuth: false,
};

export default memo(CommentForm);
