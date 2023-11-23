const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param {string} name  Название HTML тега
 * @param {Object} props  Свойства и атрибуты элемента
 * @param {Node[]} children Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, children = []) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Создание генератора Id
 * @param {string=} prefix 
 * @returns {() => number | string}
 */
function createGeneratorId(prefix) {
  let id = 0;

  const nextId = () => {
    id += 1
    return prefix ? `${prefix}_${id}` : id;
  }

  return nextId;
}

/**
 * Генератор уникальных чисел
 * @returns {number}
 */
export const nextId = createGeneratorId();

/**
 * @typedef {Object} IPluralForms
 * @property {string=} zero
 * @property {string} one
 * @property {string=} two
 * @property {string=} few
 * @property {string=} many
 * @property {string=} other
 */

/**
 * Плюрализация предложения
 * @param {number} count Число для плюрализации
 * @param {IPluralForms} pluralForms Объект с формами плюрализации
 * @param {string | Intl.Locale} locale Строка с языковым тегом BCP 47 или экземпляр Intl.Locale.
 * @returns {string}
 */
export function pluralize(count, pluralForms, locale = 'ru-RU') {
  const pluralRules = new Intl.PluralRules(locale);
  const pluralTag = pluralRules.select(count);

  switch (pluralTag) {
    case 'zero':
      return `${count} ${pluralForms.zero}`;
    case 'other':
      return `${count} ${pluralForms.other}`;
    case 'two':
      return `${count} ${pluralForms.two}`;
    case 'few':
      return `${count} ${pluralForms.few}`;
    case 'many':
      return `${count} ${pluralForms.many}`;
    default:
      return `${count} ${pluralForms.one}`;
  }
}