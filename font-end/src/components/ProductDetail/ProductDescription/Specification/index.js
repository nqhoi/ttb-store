import React from "react";
import helpers from "helpers";
import "./Specification.scss";

// lấy danh sách thông số
const listSpecification = (data) => {
  let result = [];
  for (let key in data) {
    if (typeof data[key] === "object") {
      for (const k in data[key]) {
        result.push({
          key: helpers.convertProductKey(k),
          value: data[key][k],
        });
      }
      continue;
    }
    result.push({ key: helpers.convertProductKey(key), value: data[key] });
  }
  return result;
};

function Specification(props) {
  const { data } = props;
  const { brand, warranty, otherInfo, ...rest } = data;
  const list = [...listSpecification(rest)];

  // show danh sách
  const showSpecification = (list) => {
    return (
      list &&
      list.map((item, index) => (
        <div key={index} className="Specification-item d-flex p-12">
          <span className="font-size-14px flex-2">{item.key}</span>
          <span className="font-size-14px flex-3">{item.value}</span>
        </div>
      ))
    );
  };

  return (
    <div className="Specification p-t-16">
      <div className="Specification-item  d-flex p-12">
        <span className="font-size-14px flex-2">Thương hiệu</span>
        <span className="font-size-14px flex-3">{brand}</span>
      </div>
      <div className="Specification-item d-flex p-12">
        <span className="font-size-14px flex-2">Bảo hành</span>
        <span className="font-size-14px flex-3">{warranty} tháng</span>
      </div>
      {showSpecification(list)}
    </div>
  );
}

export default Specification;
