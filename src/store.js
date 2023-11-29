/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param {Function} listener
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param {Object} newState
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление записи по коду
   * @param code
   * @returns {Object | undefined}
   */
  getItem(code) {
    return this.state.list.find((item) => item.code === code);
  }

  /**
   * Добавление товара в корзину
   * @param {Object} item
   */
  addToCart(code) {
    const item = this.state.orders.find((item) => item.code === code);

    if (item) {
      this.setState({
        ...this.state,
        orders: [
          ...this.state.orders.filter((order) => order.code !== code),
          {
            ...item,
            count: item.count + 1,
          },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        orders: [
          ...this.state.orders,
          {
            ...this.getItem(code),
            count: 1,
          },
        ],
      });
    }
  }

  /**
   * Удаление удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      orders: this.state.orders.filter((order) => order.code !== code),
    });
  }
}

export default Store;
