import React, { useCallback } from "react";
import List from "./components/list";
import CartInfo from "./components/cart-info";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param {Store} store Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, orders } = store.getState();

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
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartInfo
        orders={orders}
        actions={[{ title: "Удалить", func: callbacks.ondDeleteFromCart }]}
      />
      <List
        list={list}
        actions={[{ title: "Добавить", func: callbacks.onAddToCart }]}
      />
    </PageLayout>
  );
}

export default App;
