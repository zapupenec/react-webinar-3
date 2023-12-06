import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      _id: null,
      title: null,
      description: null,
      price: null,
      madeIn: null,
      edition: null,
      category: null,
      isLoading: false,
    };
  }

  async load(_id) {
    this.setState({ isLoading: true }, `Загрузка товара id=${_id} из АПИ`);

    const response = await fetch(
      `/api/v1/articles/${_id}?fields=_id,title,price,description, edition,madeIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        _id: json.result._id,
        title: json.result.title,
        description: json.result.description,
        price: json.result.price,
        madeIn: `${json.result.madeIn.title} (${json.result.madeIn.code})`,
        edition: json.result.edition,
        category: json.result.category.title,
        isLoading: false,
      },
      `Загружен товар id=${_id} из АПИ`
    );
  }
}

export default Product;
