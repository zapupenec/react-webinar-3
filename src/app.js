import React, { useCallback } from "react";
import List from "./components/list";
import CartInfo from "./components/cart-info";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param {Store} store Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart } = store.getState();
  const { orders, totalPrice, uniqOrderCount, isShow } = cart;

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),

    ondDeleteFromCart: useCallback(
      (code) => {
        store.deleteFromCart(code);
      },
      [store]
    ),

    onShowCart: useCallback(() => {
      store.showCart();
    }, []),

    onCloseCart: useCallback(() => {
      store.closeCart();
    }, []),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <CartInfo
          onShowCart={callbacks.onShowCart}
          totalPrice={totalPrice}
          uniqOrderCount={uniqOrderCount}
        />
        <List
          actions={[{ title: "Добавить", func: callbacks.onAddToCart }]}
          list={list}
        />
      </PageLayout>
      <Modal isShow={isShow} onClose={callbacks.onCloseCart}>
        <Head title="Корзина" />
        <Cart
          actions={[{ title: "Удалить", func: callbacks.ondDeleteFromCart }]}
          orders={orders}
          totalPrice={totalPrice}
        />
      </Modal>
    </>
  );
}

export default App;
