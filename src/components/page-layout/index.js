import { memo } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function PageLayout({ head, footer }) {
  const cn = bem("PageLayout");

  return (
    <div className={cn()}>
      <div className={cn("head")}>{head}</div>
      <div className={cn("center")}>
        <Outlet />
      </div>
      <div className={cn("footer")}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(PageLayout);
