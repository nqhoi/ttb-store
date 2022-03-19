import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Specification from "./Specification";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import "./ProductDescription.scss";
import PropTypes from 'prop-types';


function ProductDescription(props) {
  const { specification, desc } = props;
  const [isHideDesc, setIsHideDesc] = useState(false);
  const [isShowSeeMore, setIsShowSeeMore] = useState(false);

  // : hiển thị xem thêm bài viết chi tiết
  const onSeeMore = () => {
    setIsHideDesc(!isHideDesc);
  };

  // : lấy kích thước bài viết mô tả sau khi render
  useEffect(() => {
    const height = document.getElementById("descId").clientHeight;
    // Nếu chiều cao bài viết > 200px thì ẩn
    if (height >= 200) {
      setIsShowSeeMore(true);
    }
  }, []);

  return (
    <Row id="descId" className="Product-Desc bg-white p-8 bor-rad-8 ">
      {/* Bài viết chi tiết */}
      <Col span={24} md={16} className={`p-tb-8 p-lr-16 ${!isHideDesc? 'hide-desc' : ''}`} >
        <h2 className="font-weight-700 underline-title">Mô tả sản phẩm</h2>
        <Posts content={desc} />
      </Col>

       {/* Thông số kỹ thuật */}
      <Col span={24} md={8} className={`p-8 ${!isHideDesc ? 'hide-desc' : ''}`}
      >
        <h2 className="font-weight-700 underline-title">Thông số kỹ thuật</h2>
        <Specification data={specification} />
      </Col>

      {/* hiển thị chế độ xem thêm */}
      {isShowSeeMore && (
        <h3 className="see-more transform-margin p-tb-16 ease-transform " onClick={onSeeMore}>
        {isHideDesc ? 'Thu gọn ' : 'Xem thêm '}
        nội dung
        {isHideDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </h3>
      )}
    </Row>
  );
}

ProductDescription.propTypes = {
  specification: PropTypes.object,
  desc: PropTypes.object,
};

export default ProductDescription;
