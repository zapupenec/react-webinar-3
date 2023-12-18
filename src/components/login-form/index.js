import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

import "./style.css";

function LoginForm({ t, disabled, onSubmit }) {
  const cn = bem("LoginForm");

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      onSubmit({
        login: e.target.username.value,
        password: e.target.password.value,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("loginForm.title")}</h3>
      <form className={cn("form")} onSubmit={handleOnSubmit}>
        <label className={cn("field")}>
          {t("loginForm.username")}
          <input
            className={cn("input")}
            type="text"
            name="username"
            autoFocus
            disabled={disabled}
            required
          />
        </label>
        <label className={cn("field")}>
          {t("loginForm.password")}
          <input
            className={cn("input")}
            type="password"
            name="password"
            disabled={disabled}
            required
          />
        </label>
        {error && <div className={cn("feedback")}>{error}</div>}
        <button type="submit" disabled={disabled}>
          {t("loginForm.submitBtn")}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  t: (text) => text,
  onSubmit: () => {},
  disabled: false,
};

export default memo(LoginForm);
