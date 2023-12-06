import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { numberFormat } from "../../utils";

function ProductInfo(props) {
  const cn = bem("ProductInfo");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.product._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{props.product.description}</div>
      <div className={cn("madeIn")}>
        Страна производитель: <span>{props.product.madeIn}</span>
      </div>
      <div className={cn("category")}>
        {"Категория: "}
        <span>{props.product.category}</span>
      </div>
      <div className={cn("edition")}>
        {"Год выпуска: "}
        <span>{props.product.edition}</span>
      </div>
      <div className={cn("price")}>
        {`Цена: ${numberFormat(props.product.price)} ₽`}
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
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
