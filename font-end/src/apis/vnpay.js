import axiosClient from "./axiosClient";

const VNPAY_API_URL = "/vnpay";

const vnpayApi = {
  vnpayCheckout: (params) => {
    const url = VNPAY_API_URL + '/payment/checkout';
    return axiosClient.post(url);
  }
};

export default vnpayApi;
