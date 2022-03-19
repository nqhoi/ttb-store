import React from "react";
import { Col, Row } from "antd";
import './FamousBrand.scss'

function FamousBrand() {
  const showBrandList = (list) => {
    return list.map((item, index) => (
      <Col span={12} md={6} key={index}>
        <div className="brand-item t-center">
          <a href={item.link} alt={item.title} target="blank">
            <img className="bor-rad-8" src={item.src} alt="" />
          </a>
          <h4 className="font-size-18px m-t-12">{item.title}</h4>
        </div>
      </Col>
    ));
  };

  // danh sách thương hiệu
  const list = [
    {
      link: "https://www.asus.com/vn/",
      src: "https://lh3.googleusercontent.com/IqFtu_Hq7dQkOuTjKwVTjKV5Z1qK3FsuX3yX6Ab30i_yXZ2B1dFs8uQwQ9zgTt3UZts3RnuYx-ujvQW0i5Ox2UDhrqxeehI=rw-w400",
      title: "ASUS",
      desc: "Sản phẩm siêu chất lượng",
    },
    {
      link: "https://vn.msi.com/",
      src: "https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268385/famous-brands/msi_zjnihe.webp",
      title: "MSI",
      desc: "Bé rồng đỏ siêu cute, gaming",
    },
    {
      link: "https://www8.hp.com/us/en/home.html",
      src: "https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268384/famous-brands/hp_cdxdv8.webp",
      title: "HP",
      desc: "Laptop siêu cấp vip pro",
    },
    {
      link: "https://www.lenovo.com/vn/vn/",
      src: "https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268384/famous-brands/lenovo_trmmkt.webp",
      title: "LENOVO",
      desc: "Siêu ưu đãi cùng với LENOVO",
    },
  ];

  return (
    <div className="p-16 FamousBrand">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="font-weight-700 underline-title">Thương hiệu nổi bật</h2>
        </Col>
        {showBrandList(list)}
      </Row>
    </div>
  );
}

export default FamousBrand;
