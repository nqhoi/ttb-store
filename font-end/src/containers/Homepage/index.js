import { Col, Row } from "antd";
import Filter from "components/Filter";
import React from "react";
import DiscountList from "./DiscountList";
import SaleOff from "./SaleOff";
import './Homepage.scss'
import FamousBrand from "./FamousBrand";
import AllProduct from "./AllProduct";
import ProductTopSell from "components/ProductDetail/ProductTopSell";

function Homepage() {
  // kéo về đầu trang
  document.querySelector("body").scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="Home">
      {/* Carousel cho sale off */}
      <div className="position-relative">
        <SaleOff />
        <div className="filter-wrapper transform-filter container w-100 h-80">
          <Filter />
        </div>
      </div>

      <Row className="container">
        {/* Danh sách sản phẩm khuyến mãi */}
        <Col span={24} className="m-tb-32">
          <DiscountList />
        </Col>

        <Col span={24} className="adv t-center  bor-rad-8 m-b-32">
          <a href="https://phongvu.vn/cong-nghe/?pv_source=homepage" target="blank">
            <img
              className="adv-img w-100 bor-rad-8"
              src="https://lh3.googleusercontent.com/A_9rBVDzOO-ZgxQwgFW8e4No_hopHf1iRBCDySSXnPR4CH3O9g1Nagddwss7k0N_YaYmyd8kyIuIRS1h7r0veGlnUBxrKCJ5=rw"
              alt=""
            />
          </a>
        </Col>

         {/* Thương hiệu nổi bật */}
         <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
          <FamousBrand />
        </Col>

         {/* Sản phẩm bán chạy */}
         <Col span={24} className="m-b-32 hot-products box-sha-home bor-rad-8">
          <ProductTopSell title="Sản phẩm bán chạy" />
        </Col>

        {/* Tất cả sản phẩm */}
        <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
          <AllProduct/>
        </Col>

      </Row>
    </div>
  );
}

export default Homepage;
