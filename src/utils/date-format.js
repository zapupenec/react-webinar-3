/**
 * Форматирование даты для комментария
 * @param {Date} date
 * @param {Object} options
 * @returns {String}
 */
export default function dateFormat(
  date,
  locale = "ru-RU",
  options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) {
  return new Date(date).toLocaleString(locale, options).replace(/\s*г\./, "");
}

// 25 августа 2022 в 14:00
