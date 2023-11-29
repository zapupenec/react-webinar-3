import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";
import Modal from "../modal";
import Cart from "../cart";
import Button from "../button";

function CartInfo(props) {
  const [isShowCart, setIsShowCart] = useState(false);

  const callbacks = {
    onShowCart: useCallback(() => {
      setIsShowCart(true);
    }, []),

    onCloseCart: useCallback(() => {
      setIsShowCart(false);
    }, []),
  };

  const count = props.orders.length;
  const totalPrice = props.orders.reduce(
    (acc, { count, price }) => acc + count * price,
    0
  );

  const pluralForms = {
    one: "товар",
    few: "товара",
    many: "товаров",
    other: "товара",
  };

  return (
    <>
      <div className="CartInfo">
        <div className="CartInfo-text">
          В корзине:
          <span className="CartInfo-info">
            {count === 0 ? (
              "пусто"
            ) : (
              <>
                {`${count} `}
                <span className="CartInfo-generalName">
                  {plural(count, pluralForms)}
                </span>
                {` / ${totalPrice.toLocaleString("ru-RU")} ₽`}
              </>
            )}
          </span>
        </div>
        <div className="CartInfo-controls">
          <Button onClick={callbacks.onShowCart} text="Показать" />
        </div>
      </div>
      <Modal isShow={isShowCart} onClose={callbacks.onCloseCart}>
        <Cart
          orders={props.orders}
          actions={props.actions}
          onCloseCart={callbacks.onCloseCart}
          totalPrice={totalPrice}
        ></Cart>
      </Modal>
    </>
  );
}

CartInfo.propTypes = {
  orderds: PropTypes.array,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      func: PropTypes.func,
    })
  ),
};

export default React.memo(CartInfo);
