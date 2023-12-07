import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import HeaderBottom from "../../components/header-bottom";
import Navigation from "../../components/navigation";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useLanguage from "../../store/use-language";

function Main() {
  const store = useStore();
  const params = useParams();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    pageCount: state.catalog.pageCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { translations } = useLanguage();

  useEffect(() => {
    store.actions.catalog.load(params.page, 10);
  }, [params.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <Head title={translations.store} />
      <HeaderBottom>
        <Navigation />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </HeaderBottom>
      <List list={select.list} renderItem={renders.item} onC />
      <Pagination
        activePage={Number(params.page)}
        pageCount={select.pageCount}
      />
    </>
  );
}

export default memo(Main);
