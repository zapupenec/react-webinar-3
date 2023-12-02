import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { getPriceDisplay, plural } from "../../utils";
import Button from "../button";

function CartInfo(props) {
  const pluralForms = {
    one: "товар",
    few: "товара",
    many: "товаров",
    other: "товара",
  };

  return (
    <div className="CartInfo">
      <div className="CartInfo-text">
        В корзине:
        <span className="CartInfo-info">
          {props.uniqOrderCount === 0 ? (
            "пусто"
          ) : (
            <>
              {`${props.uniqOrderCount} `}
              <span className="CartInfo-generalName">
                {plural(props.uniqOrderCount, pluralForms)}
              </span>
              {` / ${getPriceDisplay(props.totalPrice)}`}
            </>
          )}
        </span>
      </div>
      <div className="CartInfo-controls">
        <Button onClick={props.onShowCart} text="Показать" />
      </div>
    </div>
  );
}

CartInfo.propTypes = {
  totalPrice: PropTypes.number,
  uniqOrderCount: PropTypes.number,
  onShowCart: PropTypes.func,
};

CartInfo.defaultProps = {
  onShowCart: () => {},
};

export default React.memo(CartInfo);
