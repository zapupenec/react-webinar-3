import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { numberFormat, plural } from "../../utils";
import useLanguage from "../../store/use-language";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const { locale, translations } = useLanguage();

  return (
    <div className={cn()}>
      <span className={cn("label")}>{`${translations.inCart}:`}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              translations.product,
              locale
            )} / ${numberFormat(sum, locale)} ₽`
          : translations.empty}
      </span>
      <button onClick={onOpen}>{translations.toCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
