import useSelector from "./use-selector";

/**
 * Хук для работы с языком
 * @param selector {Function}
 * @return {*}
 */
export default function useLanguage() {
  const { locale, translations } = useSelector((state) => ({
    locale: state.language.locale,
    translations: state.language.translations,
  }));

  return { locale, translations: translations[locale] };
}
