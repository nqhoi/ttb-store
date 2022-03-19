import React from "react";
import { Link } from "react-router-dom";
import constants from "constants/index";
import PropTypes from "prop-types";

DetailFilter.defaultProps = {
  visible: false,
  list: [],
  root: constants.ROUTES.FILTER,
};

function DetailFilter(props) {
  const { visible, list, root } = props;

  const renderDetailFilter = (list, root) => {
    return (
      list &&
      list.map((item, index) => (
        <div className="Filter-detail-item m-b-18" key={index}>
          <span className="title">
            {item.title} <b>&#8919;</b>
          </span>
          {item.subFilters.map((sub, index) => (
            <a
              className="sub-filter"
              href={root + "&" + item.query + sub.to}
              key={index}
            >
              <span className="p-lr-6">&nbsp;|&nbsp;</span>
              {sub.title}
            </a>
          ))}
        </div>
      ))
    );
  };

  return (
    <>
      {visible && (
        <div className="Filter-detail bor-rad-8 p-tb-16 p-lr-32 w-100 h-100 m-l-16 d-flex flex-direction-column">
          {renderDetailFilter(list, root)}
        </div>
      )}
    </>
  );
}

DetailFilter.propTypes = {
  list: PropTypes.array,
  visible: PropTypes.bool,
  root: PropTypes.string,
};

export default DetailFilter;
