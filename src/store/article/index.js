import simplifyErrors from "../../utils/simplify-errors";
import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class ArticleState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      errors: null,
    };
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      errors: null,
    });

    try {
      const res = await this.services.api.request({
        url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
      }

      // Товар загружен успешно
      this.setState(
        {
          data: res.data.result,
          waiting: false,
        },
        "Загружен товар из АПИ"
      );
    } catch (e) {
      // Ошибка при загрузке
      const err = JSON.parse(e.message);
      this.setState({
        data: {},
        waiting: false,
        errors: simplifyErrors(err.data.issues),
      });
    }
  }
}

export default ArticleState;
