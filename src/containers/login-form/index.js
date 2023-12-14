import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const cn = bem("LoginForm");
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));

  const callbacks = {
    handleOnSubmit: useCallback(
      (e) => {
        e.preventDefault();
        store.actions.auth
          .login({
            login: e.target.username.value,
            password: e.target.password.value,
          })
          .then(() => {
            navigate("/profile");
          });
      },
      [store]
    ),
  };

  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("loginForm.title")}</h3>
      <form className={cn("form")} onSubmit={callbacks.handleOnSubmit}>
        <label className={cn("field")}>
          {t("loginForm.username")}
          <input
            type="text"
            name="username"
            autoFocus
            disabled={select.waiting}
            required
          />
        </label>
        <label className={cn("field")}>
          {t("loginForm.password")}
          <input
            type="password"
            name="password"
            disabled={select.waiting}
            required
          />
        </label>
        {select.error && <div className={cn("feedback")}>{select.error}</div>}
        <button type="submit" disabled={select.waiting}>
          {t("loginForm.submitBtn")}
        </button>
      </form>
    </div>
  );
}

export default memo(LoginForm);
