import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

function CheckboxField(props) {
  const { field, className, children } = props;
  const { name, value } = field;
  return (
    <Checkbox className={className} name={name} {...field} checked={value}>
      {children}
    </Checkbox>
  );
}

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.any,
};

export default CheckboxField;
