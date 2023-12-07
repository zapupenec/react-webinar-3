import { memo, useCallback } from "react";

import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function LanguageSwitcher() {
  const cn = bem("LanguageSwitcher");
  const select = useSelector((state) => ({
    locale: state.language.locale,
    translations: state.language.translations,
  }));

  const store = useStore();
  const callbacks = {
    // Переключение языка
    switchLanguageTo: useCallback(
      (e) => store.actions.language.switchLanguageTo(e.target.value),
      [store]
    ),
  };

  return (
    <select
      className={cn()}
      value={select.locale}
      onChange={callbacks.switchLanguageTo}
    >
      {Object.entries(select.translations).map(([locale, translate]) => (
        <option key={locale} value={locale}>
          {translate.language}
        </option>
      ))}
    </select>
  );
}

export default memo(LanguageSwitcher);
