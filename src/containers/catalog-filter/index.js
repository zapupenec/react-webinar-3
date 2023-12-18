import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    categories: state.category.categories,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Выбор категории
    onCategory: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
      [store]
    ),
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort, page: 1 }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const { t } = useTranslate();

  const options = {
    categories: useMemo(
      () =>
        select.categories.map(({ _id, title }) => ({
          value: _id,
          title,
        })),
      [select.categories]
    ),
    sort: useMemo(
      () => [
        { value: "order", title: t("filter.order") },
        { value: "title.ru", title: t("filter.title") },
        { value: "-price", title: t("filter.expensive") },
        { value: "edition", title: t("filter.edition") },
      ],
      [t]
    ),
  };

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t("filter.search")}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
