import React from "react";
import truckIcon from "assets/icon/truck_24px.png";
import okIcon from "assets/icon/ok_24px.png";
import returnProductIcon from "assets/icon/return-product_24px.png";
import truckIcon_2 from "assets/icon/truck-2_24px.png";
import wrenchIcon from "assets/icon/wrench_24px.png";
import guaranteeIcon from "assets/icon/guarantee_24px.png";

function ProductPolicy(props) {
  return (
    <div className="bg-white p-12 policy">
      <div
        style={{ color: "#53C303", borderBottom: "1px solid #ccc" }}
        className="p-b-16"
      >
        <img src={truckIcon} alt="" className="m-r-8" />
        Sản phẩm được miến phí giao hàng
      </div>
      <div className="font-weight-700 font-size-16px p-t-16">
        <img alt="" src={okIcon} className="m-r-8" />
        Chính sách bán hàng
      </div>
      <div className="m-b-12">
        <img alt="" src={truckIcon_2} className="m-r-8" />
        Miễn phí giao hàng từ 800k
      </div>
      <div className="m-b-12">
        <img alt="" src={returnProductIcon} className="m-r-8" />
        Đổi trả miễn phí trong 7 ngày
      </div>
      <h3 className="font-weight-700 m-tb-12">Dịch vụ khác</h3>
      <div className="m-b-12">
        <img alt="" src={guaranteeIcon} className="m-r-8" />
        Miễn phí bảo hành tại nhà
      </div>
      <div className="m-b-12">
        <img alt="" src={guaranteeIcon} className="m-r-8" />
        Vệ sinh máy tính, laptop.
      </div>
      <div className="m-b-12">
        <img alt="" src={wrenchIcon} className="m-r-8" />
        Sửa chữa đồng giá 150.000đ
      </div>
    </div>
  );
}

export default ProductPolicy;
