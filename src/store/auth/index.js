import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      user: null,
      waiting: false,
      error: null,
    };
  }

  async initAuth() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });
    const json = await response.json();

    if (!response.ok) return;

    this.setState(
      {
        ...this.getState(),
        user: json.result,
      },
      "Пользователь авторизован"
    );
  }

  async login(loginData) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
        error: null,
      },
      "Запрос для авторизации"
    );

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      localStorage.setItem("token", json.result.token);
      this.setState(
        {
          ...this.getState(),
          user: json.result.user,
          waiting: false,
        },
        "Пользователь авторизован"
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error: error.message,
          waiting: false,
        },
        "Ошибка автризации"
      );
      throw error;
    }
  }

  logout() {
    const token = localStorage.getItem("token");

    fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    localStorage.removeItem("token");
    this.setState(this.initState(), "Пользователь вышел");
  }
}

export default AuthState;
