import { memo } from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import routes from "../../app/routes";

function Navigation() {
  const cn = bem("Navigation");
  return (
    <ul className={cn()}>
      <li className={cn("item")}>
        <Link className={cn("link")} to={routes.main}>
          Главная
        </Link>
      </li>
    </ul>
  );
}

export default memo(Navigation);
