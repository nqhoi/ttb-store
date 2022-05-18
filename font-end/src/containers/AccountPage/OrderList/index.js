import { Button, Spin, Table, Tooltip, message } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
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
  const [modalDel, setModalDel] = useState({ visible: false, _id: "" });
  const [orderDetails, setOrderDetails] = useState({isOpen: false, orderId: ""});

  // fn: Xử lý xóa đơn hàng
  const onDelete = async (_id) => {
    try {
      const response = await orderApi.removeOrder(_id);
      if (response && response.status === 200) {
        message.success("Xoá thành công.");
        const newList = orderList.filter((item) => item._id !== _id);
        setOrderList(newList);
      }
    } catch (error) {
      message.error("Xoá thất bại, thử lại !");
    }
  };

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
      defaultSortOrder: "descend",
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
      // render: (value, records) => {
      //   const total = helpers.calTotalOrderFee(records);
      //   return helpers.formatProductPrice(total);
      // },
      // sorter: (a, b) =>
      //   helpers.calTotalOrderFee(a) - helpers.calTotalOrderFee(b),
      render: (value, records) => {
        const total = helpers.calTotalOrderFee2(records);
        return helpers.formatProductPrice(total);
      },
      sorter: (a, b) =>
        helpers.calTotalOrderFee2(a) - helpers.calTotalOrderFee2(b),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      filters: generateOrderStaFilter(),
      onFilter: (value, record) => record.orderStatus === value,
      render: (orderStatus) => helpers.convertOrderStatus(orderStatus),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      // width: 150,
      render: (records) => (
        <>
          {/* Chỉ được hủy đơn hàng khi chưa xác nhận */}
          {records.orderStatus === 0 && (
            <Tooltip title="Xóa" placement="left">
              <DeleteOutlined
                onClick={() => setModalDel({ visible: true, _id: records._id })}
                className="m-r-8 action-btn-order"
                style={{ color: "red" }}
              />
            </Tooltip>
          )}

          <Tooltip title="Xem chi tiết" placement="left">
            <EyeOutlined
              onClick={() =>
                setOrderDetails({ isOpen: true, orderId: records._id })
              }
              className="action-btn-order"
              style={{ color: "#444" }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  // : hiển thị danh sách đơn hàng
  const showOrderList = (list) => {
    return list && list.length === 0 ? (
      <h3 className="m-t-16 t-center" style={{ color: "#888" }}>
        Hiện tại bạn chưa có đơn hàng nào
      </h3>
    ) : (
      <>
        {/* modal confirm cancel order */}
        <Modal
          title="Xác nhận hủy đơn hàng"
          visible={modalDel.visible}
          onOk={() => {
            onDelete(modalDel._id);
            setModalDel({ visible: false, _id: false });
          }}
          onCancel={() => setModalDel({ visible: false, _id: false })}
          okButtonProps={{ danger: true }}
          okText="Xoá"
          cancelText="Huỷ bỏ"
        >
          <WarningOutlined style={{ fontSize: 28, color: "#F7B217" }} />
          <b> Không thể khôi phục được, bạn có chắc muốn hủy đơn hàng ?</b>
        </Modal>
        {/* table show order list */}
        <Table
          columns={orderColumns}
          dataSource={list}
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
            position: ["bottomRight"],
          }}
        />
      </>
    );
  };

  // : Lấy danh sách
  useEffect(() => {
    let isSubscribe = true;
    const getOrderList = async () => {
      try {
        setIsLoading(true);
        const response = await orderApi.getOrderList2(user._id);
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
