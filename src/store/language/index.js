import StoreModule from "../module";
import locales from "../../locales";

class Language extends StoreModule {
  initState() {
    const locale = localStorage.getItem("locale");

    return {
      locale: locale ? JSON.parse(locale) : "ru",
      translations: locales,
    };
  }

  /**
   * Переключение языка
   * @param language Код языка
   */
  async switchLanguageTo(locale) {
    this.setState(
      {
        ...this.getState(),
        locale,
      },
      `Переключение языка на ${locale}`
    );

    localStorage.setItem("locale", JSON.stringify(this.getState().locale));
  }
}

export default Language;
