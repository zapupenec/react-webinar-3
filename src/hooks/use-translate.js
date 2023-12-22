import { useMemo } from "react";
import useServices from "./use-services";
import { useState } from "react";
import { useLayoutEffect } from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.lang);

  const unsubscribe = useMemo(() => {
    return i18n.subscribe((newLang) => {
      setLang(newLang);
    });
  }, []);

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(
    () => ({
      lang,
      setLang: (newLang) => {
        i18n.setLang(newLang);
      },
      t: (text, number) => i18n.translate.apply(i18n, [lang, text, number]),
    }),
    [lang]
  );
}
