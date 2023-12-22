class I18n {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = { defaultLang: "ru" }) {
    this.services = services;
    this.config = config;
    this.lang = config.defaultLang;
    this.listeners = [];
  }

  translate(lang, text, plural) {
    let result =
      this.config.translations[lang] && text in this.config.translations[lang]
        ? this.config.translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang(newLang) {
    this.lang = newLang;
    this.services.api.setHeader("X-lang", newLang);
    this.listeners.forEach((listener) => listener(this.lang));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }
}

export default I18n;
