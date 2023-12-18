import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ArticleState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null,
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      data: {},
      waiting: true,
      error: null,
    });

    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();

      // не могу открыть swagger по ссылке http://example.front.ylab.io/api/v1/docs/
      // отправил неверный id и получил тело с таким путем к сообщению
      // недеюсь верно =)
      if (!response.ok) {
        throw new Error(json.error.message);
      }

      // Товар загружен успешно
      this.setState({
        ...this.getState(),
        data: json.result,
        waiting: false
      }, 'Загружен товар из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        data: {},
        waiting: false,
        error: e.message,
      }, 'Ошибка при загрузке товара');
      throw e;
    }
  }
}

export default ArticleState;
