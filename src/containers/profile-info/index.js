import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

function ProfileInfo() {
  const { t } = useTranslate();
  const cn = bem("ProfileInfo");

  const select = useSelector((state) => ({
    name: state.auth.user?.profile.name,
    phone: state.auth.user?.profile.phone,
    email: state.auth.user?.email,
  }));

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("profile.title")}</h3>
      <div className={cn("fields")}>
        <div>
          {`${t("profile.name")}: `}
          <span className={cn("data")}>{select.name}</span>
        </div>
        <div>
          {`${t("profile.phone")}: `}
          <span className={cn("data")}>{select.phone}</span>
        </div>
        <div>
          {`${t("profile.email")}: `}
          <span className={cn("data")}>{select.email}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileInfo);
