import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [
        {
          _id: "",
          title: "Все",
        },
      ],
      waiting: false,
    };
  }

  groupingCategories(categories, marker = "-") {
    let result = [];
    if (categories.length <= 1) {
      return categories;
    }

    const firstRootCategory = categories.find((category) => !category.parent);
    const rest = categories.filter(
      (category) => category._id !== firstRootCategory._id
    );

    const processItem = (currCategory, level = 0) => {
      const children = rest.filter(
        (category) => category.parent?._id === currCategory._id
      );

      return [
        {
          ...currCategory,
          title: `${`${marker} `.repeat(level)}${currCategory.title}`,
        },
        ...[].concat(...children.map((child) => processItem(child, level + 1))),
      ];
    };

    result = [...result, ...processItem(firstRootCategory)];
    rest.forEach((currCategory) => {
      if (
        !result.find(
          (category) => category && category._id === currCategory._id
        )
      ) {
        result = [...result, ...processItem(currCategory)];
      }
    });

    return result;
  }

  async loadCategories() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Загрузка списка категорий"
    );

    const apiParams = {
      limit: "*",
      fields: "_id,title,parent(_id)",
    };

    const response = await fetch(
      `/api/v1/categories?${new URLSearchParams(apiParams)}`
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        categories: [
          ...this.initState().categories,
          ...this.groupingCategories(json.result.items),
        ],
        waiting: false,
      },
      "Загружен список категорий из АПИ"
    );
  }
}

export default CategoryState;
