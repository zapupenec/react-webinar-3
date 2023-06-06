import StoreModule from "../module";

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false // признак ожидания загрузки
    }
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true
    });

    const response = await fetch(`/api/v1/users/self`, {
      headers: {
        'X-Token': this.store.getState().session.token
      }
    });
    const json = await response.json();

    // Профиль загружен успешно
    this.setState({
      data: json.result,
      waiting: false
    }, 'Загружен профиль из АПИ');
  }
}

export default ProfileState;
