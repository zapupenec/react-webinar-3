import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { numberFormat } from "../../utils";
import useLanguage from "../../store/use-language";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");
  const { locale, translations } = useLanguage();

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{translations.total}</span>
      <span className={cn("cell")}> {numberFormat(sum, locale)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
