import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Auth() {
  const cn = bem("Auth");
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.auth.user,
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <div className={cn()}>
      {select.user ? (
        <>
          <Link to="/profile">{select.user.profile.name}</Link>
          <button onClick={callbacks.logout}>{t("auth.logout")}</button>
        </>
      ) : (
        <button>
          <Link className={cn("linkToLogin")} to="/login">
            {t("auth.login")}
          </Link>
        </button>
      )}
    </div>
  );
}

export default memo(Auth);
