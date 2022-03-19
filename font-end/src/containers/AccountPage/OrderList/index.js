import { Button, Spin, Table } from "antd";
import orderApi from "apis/orderApi";
import helpers from "helpers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderDetail from "./OrderDetail";

// : tạo danh sách lọc cho trạng thái đơn hàng
const generateOrderStaFilter = () => {
  let result = [];
  for (let i = 0; i < 7; ++i) {
    result.push({ value: i, text: helpers.convertOrderStatus(i) });
  }
  return result;
};

function OrderList() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    isOpen: false,
    orderId: "",
  });

  // các cột cho bảng danh sách đơn hàng
  const orderColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (orderCode, records) => (
        <Button
          type="link"
          onClick={() =>
            setOrderDetails({ isOpen: true, orderId: records._id })
          }
        >
          <b>{orderCode}</b>
        </Button>
      ),
    },
    {
      title: "Ngày mua",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (orderDate) => helpers.formatOrderDate(orderDate),
      sorter: (a, b) => {
        if (a.orderDate < b.orderDate) return -1;
        if (a.orderDate > b.orderDate) return 1;
        return 0;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (value, records) => {
        const total = helpers.calTotalOrderFee(records);
        return helpers.formatProductPrice(total);
      },
      sorter: (a, b) =>
        helpers.calTotalOrderFee(a) - helpers.calTotalOrderFee(b),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      filters: generateOrderStaFilter(),
      onFilter: (value, record) => record.orderStatus === value,
      render: (orderStatus) => helpers.convertOrderStatus(orderStatus),
    },
  ];

  // : hiển thị danh sách đơn hàng
  const showOrderList = (list) => {
    return list && list.length === 0 ? (
      <h3 className="m-t-16 t-center" style={{ color: "#888" }}>
        Hiện tại bạn chưa có đơn hàng nào
      </h3>
    ) : (
      <Table
        columns={orderColumns}
        dataSource={list}
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          position: ["bottomRight"],
        }}
      />
    );
  };

  // : Lấy danh sách
  useEffect(() => {
    let isSubscribe = true;
    const getOrderList = async () => {
      try {
        setIsLoading(true);
        const response = await orderApi.getOrderList(user._id);
        if (response && isSubscribe) {
          const { list } = response.data;
          setOrderList(
            list.map((item, index) => {
              return { ...item, key: index };
            })
          );
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setOrderList([]);
      }
    };

    if (user) getOrderList();

    return () => {
      isSubscribe = false;
    };
  }, [user]);
  return (
    <>
      {isLoading ? (
        <div className="t-center m-tb-50">
          <Spin title="Đang tải danh sách đơn hàng của bạn ..." size="large" />
        </div>
      ) : (
        showOrderList(orderList)
      )}
      {orderDetails.isOpen && (
        <OrderDetail
          orderId={orderDetails.orderId}
          onClose={() => setOrderDetails({ isOpen: false })}
        />
      )}
    </>
  );
}

export default OrderList;
