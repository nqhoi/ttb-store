import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import addressApi from "apis/addressApi";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import constants from "constants/index";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  message,
  Radio,
  Result,
  Row,
} from "antd";
import helpers from "helpers";
import orderApi from "apis/orderApi";
import cartReducer from "reducers/cart";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import UserAddressList from "containers/AccountPage/UserAddressList";
import CartPayment from "components/CartView/CartPayment";
import vnpayApi from "apis/vnpay";

// : Lấy địa chỉ giao hàng của user theo index
const getUserDeliveryAdd = async (userId, index = 0) => {
  try {
    const response = await addressApi.getDeliveryAddressList(userId, 1);
    if (response) {
      return response.data.list[index];
    }
    return null;
  } catch (err) {
    return null;
  }
};

function PaymentPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const carts = useSelector((state) => state.carts);
  const user = useSelector((state) => state.user);

  const note = useRef("");
  const addressIndex = useRef(-1);
  const [transport, setTransport] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  // giá tạm tính
  const tempPrice = carts.reduce(
    (a, b) => a + (b.price - (b.price * b.discount) / 100) * b.amount,
    0
  );

  // phi vận chuyển: <1000000 =0
  const transportFee = constants.TRANSPORT_METHOD_OPTIONS.find(
    (item) => item.value === transport
  ).price;

  // : hiển thị danh sách đơn hàng
  const showOrderInfo = (carts) => {
    return carts.map((item, index) => (
      <Card key={index}>
        <Card.Meta
          avatar={
            <Avatar size={48} shape="square" src={item.avt} alt="Photo" />
          }
          title={item.name}
          description={
            <>
              <span>{`Số lượng: ${item.amount}`}</span>
              <p
                className="font-size-16px font-weight-700 m-b-0"
                style={{ color: "#3555C5" }}
              >
                {helpers.formatProductPrice(
                  (item.price - (item.price * item.discount) / 100) *
                    item.amount
                )}
              </p>
              {item.discount > 0 && (
                <>
                  <p
                    className="font-size-12px font-weight-700"
                    style={{ textDecoration: "line-through", color: "#aaa" }}
                  >
                    {helpers.formatProductPrice(item.price)}
                  </p>
                </>
              )}
            </>
          }
        />
      </Card>
    ));
  };

  // : đặt hàng
  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const owner = user._id;
      if (addressIndex.current === -1) {
        message.warn("Vui lòng chọn địa chỉ giao hàng");
        setIsLoading(false);
        return;
      }
      const deliveryAdd = await getUserDeliveryAdd(owner, addressIndex.current);
      const paymentMethod = 0,
        orderStatus = 0,
        transportMethod = transport;
      const orderDate = new Date();
      const productList = carts.map((item, index) => {
        const { amount, code, name, price, discount, _id } = item;
        return {
          numOfProd: amount,
          orderProd: {code, name, price, discount, id: _id },
        };
      });
      const response = await orderApi.postCreateOrder2({
        owner,
        deliveryAdd,
        paymentMethod,
        orderStatus,
        transportMethod,
        transportFee,
        orderDate,
        productList,
        note: note.current,
      });
      if (response && response.status === 200) {
        setTimeout(() => {
          message.success("Đặt hàng thành công", 2);
          setIsLoading(false);
          setIsOrderSuccess(true);
          dispatch(cartReducer.resetCart());
        }, 1000);
      }
    } catch (error) {
      message.error("Đặt hàng thất bại, thử lại", 3);
      setIsLoading(false);
    }
  };

  const vnpayCheckout = async() => {
    const response = await vnpayApi.vnpayCheckout()
  }

  return (
    <>
      {carts.length <= 0 && !isOrderSuccess && (
        <Redirect to={constants.ROUTES.CART} />
      )}
      {isAuth ? (
        <div className="container m-tb-32" style={{ minHeight: "100vh" }}>
          {isOrderSuccess ? (
            <Result
              status="success"
              title="Đơn hàng của bạn đã đặt thành công."
              subTitle="Xem chi tiết đơn hàng vừa rồi"
              extra={[
                <Button type="default" key="0">
                  <Link to={constants.ROUTES.ACCOUNT + "/orders"}>
                    Xem chi tiết đơn hàng
                  </Link>
                </Button>,
                <Button type="primary" key="1">
                  <Link to="/">Tiếp tục mua sắm</Link>
                </Button>,
              ]}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {/* Đường dẫn */}
              <Col span={24} className="d-flex page-position">
                <Link to="/">
                  <HomeOutlined
                    className="p-12 icom-home font-size-16px bg-white"
                    style={{ borderRadius: 50 }}
                  />
                </Link>
                <span
                  className="p-lr-8 font-weight-500"
                  style={{ lineHeight: "40px" }}
                >
                  {`>`}
                </span>
                <span
                  className="p-8 font-weight-500 bg-white"
                  style={{ borderRadius: 50 }}
                >
                  Tiến hành thanh toán
                </span>
              </Col>

              {/* Thông tin giao hàng  */}
              <Col span={24} md={16}>
                {/* địa chỉ giao nhận, cách thức giao */}
                <div className="p-12 bg-white bor-rad-8 m-tb-16">
                  <h2>Thông tin giao hàng</h2>
                  <Radio.Group
                    defaultValue={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    className="m-tb-8"
                  >
                    {constants.TRANSPORT_METHOD_OPTIONS.map((item, index) => (
                      <Radio key={index} value={item.value}>
                        {item.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                  <UserAddressList
                    isCheckout={true}
                    onChecked={(value) => (addressIndex.current = value)}
                  />
                </div>

                {/* ghi chú */}
                <div className="p-12 bg-white bor-rad-8">
                  <h2 className="m-b-8">Ghi chú cho đơn hàng</h2>
                  <Input.TextArea
                    placeholder="Nhập thông tin cần ghi chú "
                    maxLength={200}
                    showCount
                    allowClear
                    onChange={(value) => (note.current = value.target.value)}
                  />
                </div>

                {/* phương thức thanh toán */}
                <div className="p-12 bgPlate bor-rad-8 m-tb-16">
                  <h2 className="m-b-8">Phương thức thanh toán</h2>
                  <p>Thông tin thanh toán của bạn sẽ luôn được bảo mật</p>
                  <Row gutter={[16, 16]}>
                    <Col span={24} md={12}>
                      <div className="bg-gray item-active p-tb-8 p-lr-16">
                        <b className="font-size-16px">
                          Thanh toán khi nhận hàng
                        </b>
                        <p>
                          Thanh toán bằng tiền mặt khi nhận hàng tại nhà hoặc
                          showroom.
                        </p>
                      </div>
                    </Col>
                    <Col
                      span={24} md={12}
                      onClick={() =>
                        message.warn(
                          "Tính năng đang được cập nhật. Rất xin lỗi quý khách vì sự bất tiện này",
                          3
                        )
                      }

                      // onClick={vnpayCheckout}
                    >
                      <div className="bg-gray p-tb-8 p-lr-16">
                        <b className="font-size-16px">
                          Thanh toán Online qua cổng VNPAY
                        </b>
                        <p>
                          Thanh toán qua Internet Banking, Visa, Master, JCB,
                          VNPAY-QR.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* đặt hàng */}
              <Col span={24} md={8}>
                {/* thông tin đơn hàng */}
                <div className="bg-white p-12 bor-rad-8 m-tb-16">
                  <div className="d-flex justify-content-between">
                    <h2>Thông tin đơn hàng</h2>
                    <Button type="link" size="large">
                      <Link to={constants.ROUTES.CART}>Chỉnh sửa</Link>
                    </Button>
                  </div>
                  <div>{showOrderInfo(carts)}</div>
                </div>

                {/* tiến hành đặt hàng */}
                <div className="bg-white">
                  <CartPayment
                    isLoading={isLoading}
                    carts={carts}
                    isCheckout={true}
                    transportFee={transportFee}
                    onCheckout={onCheckout}
                  />
                  <div className="t-center p-b-16">
                    <span
                      style={{
                        color: "#ff5000",
                      }}
                    >{`(Xin vui lòng kiểm tra lại đơn hàng trước khi đặt mua)`}</span>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <Redirect to={constants.ROUTES.LOGIN} />
      )}
    </>
  );
}

export default PaymentPage;
