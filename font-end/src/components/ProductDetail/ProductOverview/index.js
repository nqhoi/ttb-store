import React, { useState } from "react";
import { Button, Col, Image, InputNumber, message, Rate, Row } from "antd";
import { CheckOutlined, PhoneOutlined } from "@ant-design/icons";
import helpers from "helpers";
import ImgLoadFailed from "assets/imgs/loading-img-failed.png";
import "./ProductOverview.scss";
import { useSelector } from "react-redux";
import cartActions from "reducers/cart";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import constants from "constants/index";

// đếm số sản phẩm đó trong giỏ hàng
function countItemInCart(productCode, carts) {
  let count = 0;
  if (carts) {
    carts.forEach((item) => {
      if (item.code === productCode) count += item.amount;
    });
  }
  return count;
}

function ProductOverview(props) {
  const { products } = props;
  const {
    _id,
    avt,
    name,
    brand,
    code,
    price,
    rate,
    discount,
    stock,
    otherInfo,
  } = products.product;
  const { catalogs, ...productRest } = products.productDetail;
  const imgList = [avt, ...catalogs];
  const rateAvg = helpers.calStar(rate);
  const rateTotal = rate.reduce((a, b) => a + b, 0);
  const priceAfter = price - (price * discount) / 100;
  const [avtIndex, setAvtIndex] = useState(0);
  const [numOfProduct, setNumberOfProduct] = useState(1);
  const carts = useSelector((state) => state.carts);
  const currentStock = stock - countItemInCart(code, carts);

  const dispatch = useDispatch();

  // hiên thị danh sách hình ảnh sp
  const showCatalogs = (catalog) => {
    return catalog.map((item, index) => (
      <Image.PreviewGroup key={index}>
        <Image
          src={item}
          width={48}
          className={`catalog-item p-8 ${index === avtIndex ? "active" : ""}`}
          onMouseEnter={() => setAvtIndex(index)}
        />
      </Image.PreviewGroup>
    ));
  };

  // hiển thị thông tin cơ bản của sản phẩm
  const showOverviewInfo = (product) => {
    let result = [];
    let i = 0;
    for (let key in product) {
      if (i >= 5) break;
      if (typeof product[key] === "string") {
        result.push(
          <p key={i++} className="m-t-8">
            {`- ${helpers.convertProductKey(key)}: ${product[key]}`}
          </p>
        );
      }
    }
    return result;
  };

  const addCart = () => {
    let product = {
      code,
      name,
      price,
      amount: numOfProduct,
      avt,
      discount,
      stock,
      _id,
    };
    setNumberOfProduct(1);
    dispatch(cartActions.addToCart(product));
    message.success("Thêm vào giỏ hàng thành công");
  };

  return (
    <Row className="Product-Overview bg-white p-16 bor-rad-8">
      {/* Hình ảnh và thông số cơ bản sản phẩm */}
      <Col span={24} md={8}>
        <div className="d-flex justify-content-center align-items-center">
          <Image
            style={{ maxHeight: "100%" }}
            fallback={ImgLoadFailed}
            src={imgList[avtIndex]}
          />
        </div>
        <div className="d-flex w-100 bg-white p-b-16 p-t-8">
          {showCatalogs(imgList)}
        </div>
        <div className="p-l-16 p-t-16 product-info">
          {showOverviewInfo(productRest)}
        </div>
      </Col>

      {/* Tên và thông tin cơ bản */}
      <Col span={24} md={16} className="p-l-16">
        <h2 className="font-size-24px">
          {helpers.reduceProductName(name, 200)}
        </h2>
        {/* Đánh giá sản phẩm */}
        <div className="p-tb-12">
          <Rate disabled defaultValue={rateAvg} />
          <a href="#evaluation" className="m-l-8">
            (Có {rateTotal} đánh giá)
          </a>
        </div>
        {/* Mã, thương hiệu */}
        <div
          className="font-size-16px font-weight-400"
          style={{ color: "#aaa" }}
        >
          Thương hiệu:
          <span className="product-brand font-weight-500">&nbsp;{brand}</span>
          &nbsp; | &nbsp;
          <span>{code}</span>
        </div>
        {/* Số lượng hàng còn, chỉ hiển thị khi còn ít hơn 5 */}
        {stock <= 5 && stock > 0 && (
          <div className="product-stock font-size-14px p-t-8">
            Chỉ còn {stock} sản phẩm
          </div>
        )}
        {/* Giá */}
        <h1 className="product-price font-size-24px font-weight-700 p-tb-8">
          {price === 0 ? "Liên hệ" : helpers.formatProductPrice(price)}
        </h1>
        {discount > 0 && price > 0 && (
          <>
            <h3 className="font-weight-700" style={{ color: "#333" }}>
              Bạn có 1 mã giảm giá {discount}% cho sản phẩm này
            </h3>
            <div className="discount d-flex flex-direction-column m-t-8 m-b-16 p-tb-8 p-lr-16">
              <span className="discount-price font-size-16px font-weight-700">
                Giá: {helpers.formatProductPrice(priceAfter)}
              </span>
              <span>
                Đã giảm thêm: {helpers.formatProductPrice(price - priceAfter)}
                <span className="discount-desr"></span>
              </span>
              <div className="discount-mark"></div>
              <CheckOutlined className="discount-mark-icon" />
            </div>
          </>
        )}

        {/* Chọn số lượng */}
        <div className="p-t-12 option">
          {currentStock === 0 ? (
            <h3 className="m-r-8 m-t-8 font-size-18px" style={{ color: "red" }}>
              <b>Sản phẩm hiện đang hết hàng !</b>
            </h3>
          ) : (
            <>
              <h3 className="m-r-3 m-t-8 font-size-16px">Chọn số lượng: </h3>
              <InputNumber
                name="numOfProduct"
                size="middle"
                value={numOfProduct}
                min={1}
                onChange={(value) => setNumberOfProduct(value)}
              />
            </>
          )}
        </div>

        {/* Button*/}
        {price > 0 && currentStock > 0 ? (
          <div className="btn-group p-tb-16 d-flex justify-content-around">
            <Button
              size="large"
              disabled={stock ? false : true}
              className="m-r-16 w-100 btn-group-item"
              type="primary"
              onClick={addCart}
            >
              <Link to={constants.ROUTES.PAYMENT}>MUA NGAY</Link>
            </Button>

            <Button
              size="large"
              disabled={stock ? false : true}
              className=" w-100 btn-group-item"
              type="default "
              onClick={addCart}
            >
              THÊM GIỎ HÀNG
            </Button>
          </div>
        ) : (
          <Button
            size="large"
            className="m-tb-16 w-100 btn-group-item"
            type="primary"
          >
            <a
              href="https://www.facebook.com/aaaaaaaaaaaaaaaaaaahhhhb"
              target="blank"
            >
              <PhoneOutlined style={{ fontSize: 18 }} className="m-r-8" /> LIÊN
              HỆ
            </a>
          </Button>
        )}

        {/* Khuyến mãi liên quan */}
        {otherInfo &&
          otherInfo.map((item, index) => (
            <ul
              key={index}
              className="otherInfo-listfont-size-14px font-weight-700"
            >
              {item.key}
              <li className="otherInfo-item font-weight-400">{item.value}</li>
            </ul>
          ))}
      </Col>
    </Row>
  );
}

export default ProductOverview;
