const OrderModel = require("../models/order.model");
const Order2Model = require("../models/order2.model");
const OrderDetailModel = require("../models/orderDetails.model");
const helpers = require("../helpers");
const ProductModel = require("../models/product.models/product.model");

// api: lấy danh sách đơn hàng
const getOrderList = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const orderList = await OrderModel.find({ owner: userId }).select(
      "-owner -deliveryAdd -paymentMethod -note"
    );
    if (orderList) {
      return res.status(200).json({ list: orderList });
    }
    return res.status(200).json({ list: [] });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ list: [] });
  }
};

const getOrderList3 = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const orderList = await Order2Model.find({ owner: userId }).select(
      "-owner -deliveryAdd -paymentMethod -note"
    );
    if (orderList) {
      return res.status(200).json({ list: orderList });
    }
    return res.status(200).json({ list: [] });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ list: [] });
  }
};

const getOrderList2 = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const orderList = await Order2Model.find({ owner: userId }).select(
      "-owner -deliveryAdd -paymentMethod"
    );
    if (orderList) {
      const orderDetails = await OrderDetailModel.find().select("-_id");

      let convertedArr = {};
      orderDetails.map((each) => {
        if (convertedArr[each.orderId]) {
          convertedArr[each.orderId] = [...convertedArr[each.orderId], each];
          return;
        }
        convertedArr[each.orderId] = [each];
      });

      const result = orderList.map((each) => {
        return { ...each, details: convertedArr[`${each._id}`] };
      });

      const sd = result.map((each) => {
        return { ...each._doc, orderDetails: each.details };
      });
      return res.status(200).json({ list: sd });
    }

    return res.status(200).json({ list: [] });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ list: [] });
  }
};

// api: lấy chi tiết 1 đơn hàng
const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const order = await OrderModel.findById(orderId).select("-_id -owner");
    if (order) {
      const { deliveryAdd } = order;
      const { name, phone, address } = deliveryAdd;
      const addressStr = await helpers.convertAddress(address);
      let newOrder = {
        ...order._doc,
        deliveryAdd: { name, phone, address: addressStr },
      };
      return res.status(200).json({ order: newOrder });
    }
    return res.status(400).json({});
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

// api: lấy chi tiết 1 đơn hàng
const getOrderDetails3 = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const order = await Order2Model.findById(orderId).select("-_id -owner");
    if (order) {
      const { deliveryAdd } = order;
      const { name, phone, address } = deliveryAdd;
      const addressStr = await helpers.convertAddress(address);
      const orderDetails = await OrderDetailModel.find({
        orderId: orderId,
      }).select("-_id");
      let newOrder = {
        ...order._doc,
        deliveryAdd: { name, phone, address: addressStr },
        orderDetails,
      };
      return res.status(200).json({ order: newOrder });
    }
    return res.status(400).json({});
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

// api: lấy chi tiết 1 đơn hàng
const getOrderDetails2 = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const order = await OrderDetailModel.find({ orderId: orderId }).select(
      "-_id"
    );
    if (order) {
      return res.status(200).json({ order });
    }
    return res.status(400).json({});
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

// api: tạo 1 đơn hàng (tách nhiều sản phẩm ra mỗi sp 1 đơn)
const postCreateOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const {
      owner,
      deliveryAdd,
      paymentMethod,
      orderStatus,
      transportMethod,
      transportFee,
      orderDate,
      productList,
      note,
    } = data;

    let response = {};
    for (let i = 0; i < productList.length; ++i) {
      const { orderProd, numOfProd } = productList[i];
      const product = await ProductModel.findById(orderProd.id);
      if (product) {
        if (product.stock < parseInt(numOfProd)) {
          return res.status(401).json({ message: "Sản phẩm tồn kho đã hết" });
        } else {
          await ProductModel.updateOne(
            { _id: orderProd.id },
            { stock: product.stock - parseInt(numOfProd) }
          );
          response = await OrderModel.create({
            owner,
            orderCode: helpers.generateVerifyCode(6),
            deliveryAdd,
            paymentMethod,
            orderStatus,
            transportMethod,
            transportFee,
            orderDate,
            orderProd,
            numOfProd,
            note,
          });
        }
      } else {
        return res.status(401).json({ message: "Sản phẩm đẫ ngừng bán" });
      }
    }
    if (response) return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Lỗi hệ thống" });
  }
};

// api: tạo 1 đơn hàng (tách nhiều sản phẩm ra mỗi sp 1 đơn)
const postCreateOrder2 = async (req, res, next) => {
  try {
    const data = req.body;
    const {
      owner,
      deliveryAdd,
      paymentMethod,
      orderStatus,
      transportMethod,
      transportFee,
      orderDate,
      productList,
      note,
    } = data;

    const newOrder = await Order2Model.create({
      owner,
      orderCode: helpers.generateVerifyCode(6),
      deliveryAdd,
      paymentMethod,
      orderStatus,
      transportMethod,
      transportFee,
      orderDate,
      note,
    });

    let response = {};
    if (newOrder) {
      for (let i = 0; i < productList.length; ++i) {
        const { orderProd, numOfProd } = productList[i];
        const product = await ProductModel.findById(orderProd.id);
        if (product) {
          if (product.stock < parseInt(numOfProd)) {
            await Order2Model.deleteOne({ _id: newOrder._id });
            return res.status(401).json({ message: "Sản phẩm tồn kho đã hết" });
          } else {
            await ProductModel.updateOne(
              { _id: orderProd.id },
              { stock: product.stock - parseInt(numOfProd) }
            );
            response = await OrderDetailModel.create({
              orderId: newOrder._id,
              orderProd,
              numOfProd,
            });
          }
        } else {
          return res.status(401).json({ message: "Sản phẩm đẫ ngừng bán" });
        }
      }
    }

    if (response) return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Lỗi hệ thống" });
  }
};

module.exports = {
  getOrderList,
  getOrderList2,
  getOrderList3,
  getOrderDetails,
  getOrderDetails2,
  getOrderDetails3,
  postCreateOrder,
  postCreateOrder2,
};
