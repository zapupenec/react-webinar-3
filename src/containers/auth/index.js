import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";

function Auth() {
  const cn = bem("Auth");
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.auth.user,
  }));

  const callbacks = {
    toLoginPage: () => navigate("/login"),
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout side="end" paddingX="medium" paddingY="small">
      {select.user ? (
        <SideLayout gap="small">
          <Link to="/profile">{select.user}</Link>
          <button onClick={callbacks.logout}>{t("auth.logout")}</button>
        </SideLayout>
      ) : (
        <button onClick={callbacks.toLoginPage}>{t("auth.login")}</button>
      )}
    </SideLayout>
  );
}

export default memo(Auth);
