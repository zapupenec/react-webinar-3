import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false,
      error: null,
    };
  }

  async loadUserData() {
    const token = localStorage.getItem("token");
    if (!token) return;

    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: null,
      },
      "Загрузка данных пользователя"
    );

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState(
        {
          ...this.getState(),
          data: json.result,
          waiting: false,
        },
        "Данные пользователя загружены"
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: error.message,
        },
        "Ошибка при загрузке данных пользователя"
      );
      throw error;
    }
  }
}

export default UserState;
