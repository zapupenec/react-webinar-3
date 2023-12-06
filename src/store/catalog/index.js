import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      activePage: 1,
      pageCount: 1,
    };
  }

  setActivePage(page) {
    this.setState(
      {
        ...this.getState(),
        activePage: page,
      },
      `Переход на страницу ${page}`
    );
  }

  async load(page = 1, countOnPage = 10) {
    const response = await fetch(
      `/api/v1/articles?limit=${countOnPage}&skip=${countOnPage * (page - 1)}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    console.log(json);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        activePage: page,
        pageCount: Math.ceil(json.result.count / countOnPage),
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
