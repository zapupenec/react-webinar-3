import { memo, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import HeaderBottom from "../../components/header-bottom";
import Navigation from "../../components/navigation";

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useLanguage from "../../store/use-language";

function Product() {
  const store = useStore();

  const select = useSelector((state) => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { translations } = useLanguage();

  const params = useParams();
  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);

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

  return (
    <>
      <Head
        title={
          select.product.isLoading
            ? `${translations.loading}...`
            : select.product.title
        }
      />
      <HeaderBottom>
        <Navigation />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </HeaderBottom>
      {!select.product.isLoading && (
        <ProductInfo product={select.product} onAdd={callbacks.addToBasket} />
      )}
    </>
  );
}

export default memo(Product);
