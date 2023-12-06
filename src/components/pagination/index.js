import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { Link } from "react-router-dom";
import routes from "../../app/routes";

function Pagination({ activePage, pageCount, prevPageCount, nextPageCount, setActivePage }) {
  const cn = bem("Pagination");

  const getItems = () => {
    const items = [];
    for (let page = 1; page <= pageCount; page += 1) {
      if (
        page === 1 ||
        (page <= 1 + prevPageCount + nextPageCount && activePage <= 1 + prevPageCount) ||
        (page >= activePage - prevPageCount && page < activePage) ||
        page === activePage ||
        (page > activePage && page <= activePage + nextPageCount) ||
        (page >= pageCount - prevPageCount - nextPageCount && activePage >= pageCount - nextPageCount) ||
        page === pageCount
      ) {
        items.push(
          <li
            key={page}
            className={cn("item", { active: page === activePage })}
          >
            <Link className={cn("link")} to={`${routes.main}${page}`}>
              {page}
            </Link>
          </li>
        );
      } else if (
        (page === activePage + (prevPageCount + nextPageCount + 1) && activePage <= prevPageCount) ||
        page === activePage - (prevPageCount + 1) ||
        (page === pageCount - (prevPageCount + nextPageCount + 1) && activePage >= pageCount - nextPageCount) ||
        page === activePage + (nextPageCount + 1)
      ) {
        items.push(
          <li key={page} className={cn("item", { gap: true })}>
            ...
          </li>
        );
      }
    }

    return items;
  };

  return <ul className={cn()}>{getItems()}</ul>;
}

Pagination.propTypes = {
  activePage: PropTypes.number,
  pageCount: PropTypes.number,
  prevPageCount: PropTypes.number,
  nextPageCount: PropTypes.number,
  setActivePage: PropTypes.func,
};

Pagination.defaultProps = {
  activePage: 1,
  pageCount: 1,
  prevPageCount: 1,
  nextPageCount: 1,
  setActivePage: () => {},
};

export default memo(Pagination);
