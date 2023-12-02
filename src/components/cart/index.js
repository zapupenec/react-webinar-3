import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import List from "../list";
import Head from "../head";
import Button from "../button";
import { getPriceDisplay } from "../../utils";

function Cart(props) {
  return (
    <div className="Cart" onClick={(e) => e.stopPropagation()}>
      <div className="Cart-closeBtn">
        <Button onClick={props.onCloseCart} text="Закрыть" />
      </div>
      <Head title="Корзина" />
      <div className="Cart-list">
        <List actions={props.actions} list={props.orders} />
      </div>
      <div className="Cart-totalPrice">
        <span>Итого</span>
        <span>{getPriceDisplay(props.totalPrice)}</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  orders: PropTypes.array,
  onCloseCart: PropTypes.func,
  totalPrice: PropTypes.number,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      func: PropTypes.func,
    })
  ),
};

Cart.defaultProps = {
  onCloseCart: () => {},
};

export default React.memo(Cart);
