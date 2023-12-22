import * as translations from "./i18n/translations";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Настройки сервисов
 */
const config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: "X-Token",
      },
    },
  },
  api: {
    baseUrl: "",
  },
  i18n: {
    defaultLang: 'ru',
    translations,
  },
};

export default config;
