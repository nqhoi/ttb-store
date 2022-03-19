import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import "./FooterWiew.scss";

function FooterView() {
  return (
    <div className="container-fluid bg-white footer p-lr-0 m-t-30" id="footer">
      {/* Liên hệ */}
      <div className="footer-contact p-tb-16">
        <div className="container d-flex justify-content-between align-i-center">
          <PhoneOutlined className="phone-icon" />
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn mua hàng</h2>
            <h2 className="footer-contact-item">
              <b>0911.90.3477</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn đào tạo</h2>
            <h2 className="footer-contact-item">
              <b>0911.90.3477</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn quảng cáo</h2>
            <h2 className="footer-contact-item">
              <b>0911.90.3477</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Hỗ trợ kỹ thuật</h2>
            <h2 className="footer-contact-item">
              <b>0911.90.3477</b>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterView;
