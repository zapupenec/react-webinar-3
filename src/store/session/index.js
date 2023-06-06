import StoreModule from "../module";
import simplifyErrors from "../../utils/simplify-errors";

/**
 * Сессия
 */
class SessionState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: null,
      errors: null,
      waiting: true,
      exists: false
    };
  }

  /**
   * Авторизация (вход)
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data, onSuccess) {
    this.setState(this.initState(), 'Авторизация');
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (!json.error){
        this.setState({
          ...this.getState(),
          token: json.result.token,
          user: json.result.user,
          exists: true,
          waiting: false
        }, 'Успешная авторизация');

        // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
        window.localStorage.setItem('token', json.result.token);
        if (onSuccess) onSuccess();
      } else {
        this.setState({
          ...this.getState(),
          errors: simplifyErrors(json.error.data.issues),
          waiting: false
        }, 'Ошибка авторизации');
      }

    } catch (e) {
      console.error(error);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token
        }
      });
      // Удаляем токен
      window.localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
    this.setState({...this.initState(), waiting: false});
  }

  /**
   * Сброс ошибок авториазции
   */
  resetErrors(){
    this.setState({...this.initState(), errors: null})
  }
}

export default SessionState;
