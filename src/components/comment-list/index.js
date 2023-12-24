import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentList({
  list,
  activeId,
  parentId,
  renderItem,
  renderChildren,
  renderForm,
  level,
  maxLevel,
}) {
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
                <div
                  className={cn("children")}
                  style={level <= maxLevel ? { marginLeft: "30px" } : {}}
                >
                  {renderChildren(item, level + 1)}
                </div>
              )}
              {activeId === item._id && (
                <div
                  className={cn("form")}
                  style={level <= maxLevel ? { marginLeft: "30px" } : {}}
                >
                  {renderForm()}
                </div>
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
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  renderItem: PropTypes.func,
  renderChildren: PropTypes.func,
  renderForm: PropTypes.func,
  level: PropTypes.number,
  maxLevel: PropTypes.number,
};

CommentList.defaultProps = {
  renderItem: (item) => {},
  renderChildren: (item) => {},
  renderForm: () => {},
  level: 1,
  maxLevel: 3,
};

export default memo(CommentList);
