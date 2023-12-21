import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function Comments({ children, count, t }) {
  const cn = bem("Comments");
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        {`${t("comments.title")} (${numberFormat(count)})`}
      </div>
      {children}
    </div>
  );
}

Comments.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  t: PropTypes.func,
};

Comments.defaultProps = {
  t: (text) => text,
};

export default memo(Comments);
