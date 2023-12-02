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
  getItemBy(code) {
    return this.state.list.find((item) => item.code === code);
  }

  getOrderBy(code) {
    return this.state.cart.orders.find((item) => item.code === code);
  }

  /**
   * Добавление товара в корзину
   * @param {Object} item
   */
  addToCart(code) {
    const item = this.getOrderBy(code);

    if (item) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          orders: [
            ...this.state.cart.orders.filter((order) => order.code !== code),
            {
              ...item,
              count: item.count + 1,
            },
          ],
          totalPrice: this.state.cart.totalPrice + item.price,
        },
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          orders: [
            ...this.state.cart.orders,
            {
              ...this.getItemBy(code),
              count: 1,
            },
          ],
          totalPrice: this.state.cart.totalPrice + this.getItemBy(code).price,
          uniqOrderCount: this.state.cart.uniqOrderCount + 1,
        },
      });
    }
  }

  /**
   * Удаление удаление товара из корзины
   * @param code
   */
  deleteFromCart(code) {
    const item = this.getOrderBy(code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        orders: this.state.cart.orders.filter((order) => order.code !== code),
        totalPrice: this.state.cart.totalPrice - item.price * item.count,
        uniqOrderCount: this.state.cart.uniqOrderCount - 1,
      },
    });
  }

  /**
   * Показать корзину
   */
  showCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isShow: true,
      },
    });
  }

  /**
   * Закрыть корзину
   */
  closeCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isShow: false,
      },
    });
  }
}

export default Store;

// Сумму и количество считай в store в момент добавления/удаления, там и храни. Глупый компонент cart-info не должен выполнять никаких расчетов.
// Для модалки свой компонент по примеру PageLayout и выводить его в App.
