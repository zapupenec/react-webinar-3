import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import "./style.css";

function ProfileInfo({user , t}) {
  const cn = bem("ProfileInfo");

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{t("profile.title")}</h3>
      <div className={cn("fields")}>
        <div>
          {`${t("profile.name")}: `}
          <span className={cn("data")}>{user?.profile.name}</span>
        </div>
        <div>
          {`${t("profile.phone")}: `}
          <span className={cn("data")}>{user?.profile.phone}</span>
        </div>
        <div>
          {`${t("profile.email")}: `}
          <span className={cn("data")}>{user?.email}</span>
        </div>
      </div>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  t: PropTypes.func
};

ProfileInfo.defaultProps = {
  t: (text) => text
}

export default memo(ProfileInfo);
