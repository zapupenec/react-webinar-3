import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import routes from "../../app/routes";
import useLanguage from "../../store/use-language";

function Navigation() {
  const cn = bem("Navigation");
  const { translations } = useLanguage();

  return (
    <nav className={cn()}>
      <ul className={cn("list")}>
        <li className={cn("item")}>
          <Link className={cn("link")} to={routes.main}>
            {translations.main}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default memo(Navigation);
