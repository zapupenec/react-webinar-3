import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentList({ list, parentId, renderItem, renderChildren }) {
  const cn = bem("CommentList");
  const compare = (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate);

  const children = list
    .filter((child) => child.parent._id === parentId)
    .sort(compare);

  return (
    <>
      <div className={cn()}>
        {children.map((item) => {
          const itemChildren = list
            .filter((child) => child.parent._id === item._id)
            .sort(compare);
          return (
            <div key={item._id} className={cn("item")}>
              {renderItem(item)}
              {itemChildren.length !== 0 && (
                <div className={cn("children")}>{renderChildren(item)}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dateCreate: PropTypes.string,
      parent: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    })
  ).isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  renderItem: PropTypes.func,
  renderChildren: PropTypes.func,
};

CommentList.defaultProps = {
  renderItem: (item) => {},
  renderChildren: (item) => {},
};

export default memo(CommentList);
