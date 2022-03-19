const AddressModel = require("../models/address.model");
const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.models/product.model");

// api: thống kê doanh thu theo tháng
const getStaMonthlyRevenue = async (req, res, next) => {
  try {
    const { year } = req.query;
    // lấy danh sách đơn hàng trong năm thống kê (Chỉ lấy đơn hàng đã thanh toán)
    const thisYearOrder = await OrderModel.find({
      orderDate: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
      orderStatus: 6,
    }).select("-_id orderDate numOfProd transportFee orderProd.price");

    // lấy danh sách đơn hàng năm trước đó
    const lastYearOrder = await OrderModel.find({
      orderDate: {
        $gte: new Date(`${parseInt(year) - 1}-01-01`),
        $lte: new Date(`${parseInt(year) - 1}-12-31`),
      },
      orderStatus: 6,
    }).select("-_id orderDate numOfProd transportFee orderProd.price");

    // kết quả sau thống kê
    let thisYear = [...Array(12).fill(0)],
      lastYear = [...Array(12).fill(0)];

    // thống kê
    if (thisYearOrder) {
      thisYearOrder.forEach((item) => {
        const month = new Date(item.orderDate).getMonth();
        const totalMoney =
          item.orderProd.price * item.numOfProd + item.transportFee;
        thisYear[month] += totalMoney;
      });
    }
    if (lastYearOrder) {
      lastYearOrder.forEach((item) => {
        const month = new Date(item.orderDate).getMonth();
        const totalMoney =
          item.orderProd.price * item.numOfProd + item.transportFee;
        lastYear[month] += totalMoney;
      });
    }

    if (thisYearOrder && lastYearOrder)
      return res.status(200).json({ thisYear, lastYear });
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

// api: thống kê doanh thu theo năm
const getStaAnnualRevenue = async (req, res, next) => {
  try {
    const { startYear, endYear } = req.query;
    // lấy danh sách đơn hàng trong năm thống kê (Chỉ lấy đơn hàng đã thanh toán)
    const orderList = await OrderModel.find({
      orderDate: {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${endYear}-12-31`),
      },
      orderStatus: 6,
    }).select("-_id orderDate numOfProd transportFee orderProd.price");

    let result = [
      ...Array(parseInt(endYear) + 1 - parseInt(startYear)).fill(0),
    ];
    if (orderList) {
      orderList.forEach((item) => {
        const resIndex = new Date(item.orderDate).getFullYear() - startYear;
        const totalMoney =
          item.orderProd.price * item.numOfProd + item.transportFee;
        result[resIndex] += totalMoney;
      });
    }
    if (orderList) return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

// api: thống kê đơn hàng tỉnh nào nhiều nhất
const getTopProvinceOrder = async (req, res, next) => {
  try {
    // lấy danh sách top 5 đơn hàng trong các tinh
    const topList = await OrderModel.aggregate([
      {
        $group: {
          _id: "$deliveryAdd.address.province",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    if (topList) {
      let result = [];
      for (let i = 0; i < topList.length; ++i) {
        const province = await AddressModel.findOne({
          id: topList[i]._id,
        }).select("-_id name");
        if (province)
          result.push({ province: province.name, count: topList[i].count });
      }

      return res.status(200).json({ data: result });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ data: [] });
  }
};

//api: thống kê sản phẩm có nhiều đơn đặt hàng
const getTopProductOrder = async (req, res, next) => {
  try {
    // lấy danh sách top 10 sản phẩm
    const topList = await OrderModel.aggregate([
      {
        $group: {
          _id: "$orderProd.id",
          count: { $sum: "$numOfProd" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    if (topList) {
      let result = [];
      for (let i = 0; i < topList.length; ++i) {
        const product = await ProductModel.findOne({
          _id: topList[i]._id,
        }).select("");
        if (product)
          result.push({
            _id: product._id,
            name: product.name,
            avt: product.avt,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
            count: topList[i].count,
          });
      }
      return res.status(200).json({ data: result });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ data: [] });
  }
};

// api: thống kê danh thu từng sản phẩm
const getProductListRevenue = async (req, res, next) => {
  try {
    const { code } = req.query;

    const list = await OrderModel.aggregate([
      {
        $group: {
          _id: "$orderProd.id",
          count: { $sum: "$numOfProd" },
        },
      },
    ]);

    if (list) {
      let result = [];
      for (let i = 0; i < list.length; ++i) {
        // if (code == list[i]._id) {
          // const product = await ProductModel.findById(list[i]._id).select("-otherInfo");
          const product = await ProductModel.findOne({
            _id: list[i]._id,
          }).select("-otherInfo");
          if (product) {
            result.push({
              _id: product._id,
              code: product.code,
              name: product.name,
              price: product.price,
              type: product.type,
              brand: product.brand,
              stock: product.stock,
              discount: product.discount,
              rate: product.rate,
              count: list[i].count,
              totalPrice:
                ((product.price * (100-product.discount)/100) ) * list[i].count,
            });
          }
        // }
      }
      return res.status(200).json({ data: result });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};

module.exports = {
  getStaMonthlyRevenue,
  getStaAnnualRevenue,
  getTopProvinceOrder,
  getTopProductOrder,
  getProductListRevenue,
};
