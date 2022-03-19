const statisticApi = require('express').Router();
const statisticController = require('../controllers/statistic.controller');

// api: thống kê doanh thu theo tháng
statisticApi.get('/monthly-revenue', statisticController.getStaMonthlyRevenue);

// api: thống kê doanh thu theo năm
statisticApi.get('/annual-revenue', statisticController.getStaAnnualRevenue);

// api: thống kê đơn hàng tỉnh nào nhiều nhất
statisticApi.get('/top-order', statisticController.getTopProvinceOrder);

// api: thống kê sản phẩm có nhiều đơn đặt hàng 
statisticApi.get('/top-product-order', statisticController.getTopProductOrder);

// api: thống kê danh thu từng sản phẩm
statisticApi.get('/product-revenue', statisticController.getProductListRevenue);

module.exports = statisticApi;
