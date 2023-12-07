import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { numberFormat } from "../../utils";
import useLanguage from "../../store/use-language";

function ProductInfo(props) {
  const cn = bem("ProductInfo");
  const { locale, translations } = useLanguage();

  const callbacks = {
    onAdd: () => props.onAdd(props.product._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{props.product.description}</div>
      <div className={cn("madeIn")}>
        {`${translations.madeIn}: `} <span>{props.product.madeIn}</span>
      </div>
      <div className={cn("category")}>
        {`${translations.category}: `}
        <span>{props.product.category}</span>
      </div>
      <div className={cn("edition")}>
        {`${translations.edition}: `}
        <span>{props.product.edition}</span>
      </div>
      <div className={cn("price")}>
        {`${translations.price}: ${numberFormat(
          props.product.price,
          locale
        )} ₽`}
      </div>
      <button onClick={callbacks.onAdd}>{translations.add}</button>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ProductInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductInfo);
