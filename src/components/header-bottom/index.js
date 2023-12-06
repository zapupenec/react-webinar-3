import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function HeaderBottom({ children }) {
  const cn = bem("HeaderBottom");
  return <div className={cn()}>{children}</div>;
}

HeaderBottom.propTypes = {
  children: PropTypes.node,
};

export default memo(HeaderBottom);
