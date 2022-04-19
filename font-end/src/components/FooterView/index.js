import React from "react";
import {
  MailFilled,
  PhoneOutlined,
  GoldOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import logo from "assets/imgs/Logo2.png";
import "./FooterWiew.scss";

function FooterView() {
  return (
    <div className="footer">
      <div className="d-flex flex-wrap container justify-content-between footer-middle">
        <div className="middle-contact">
          <h3>Contact</h3>
          <i className="fa-solid fa-caret-down"></i>
          <ul className="contact-list">
            <li className="contact-item">
              <a href="http://localhost:3000/" className="logo">
                <img src={logo} alt="logo" className="logo-image" />
              </a>
            </li>
            <li className="contact-item">
              <GoldOutlined />
              <span>184 Lê Độ, Thanh Khê, Đà Nẵng</span>
            </li>
            <li className="contact-item">
              <MailFilled />
              <a href="mailto:contact@company.com"> contact@company.com</a>
            </li>
            <li className="contact-item">
              <PhoneOutlined />
              <span>+001 2233 456</span>
            </li>
            <li className="contact-item">
              <ul className="contact-list-icon">
                <li className="contact-icon">
                  <a href="https://www.facebook.com/">
                    <FacebookOutlined />
                  </a>
                </li>
                <li className="contact-icon">
                  <a href="https://www.twitter.com/">
                    <TwitterOutlined />
                  </a>
                </li>
                <li className="contact-icon">
                  <a href="https://www.instagram.com/">
                    <InstagramOutlined />
                  </a>
                </li>
                <li className="contact-icon">
                  <a href="https://www.youtube.com/">
                    <YoutubeOutlined />
                  </a>
                </li>
                <li className="contact-icon">
                  <a href="https://www.message.com/">
                    <MessageOutlined />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="middle-col">
          <h3 className="footer-tille">Categories</h3>
          <i className="fa-solid fa-caret-down"></i>
          <ul>
            <li>
              <a href=".">Celebrations</a>
            </li>
            <li>
              <a href=".">Events</a>
            </li>
            <li>
              <a href=".">Home Decor</a>
            </li>
            <li>
              <a href=".">Seasonal Bouquet</a>
            </li>
            <li>
              <a href=".">Wedding Decor</a>
            </li>
          </ul>
        </div>
        <div className="middle-col">
          <h3 className="footer-tille">Useful links</h3>
          <i className="fa-solid fa-caret-down"></i>
          <ul>
            <li>
              <a href=".">Contact us</a>
            </li>
            <li>
              <a href=".">Privacy Policy</a>
            </li>
            <li>
              <a href=".">Shipping & Delivery</a>
            </li>
            <li>
              <a href=".">Terms & Conditions</a>
            </li>
            <li>
              <a href=".">Returns & Exchanges</a>
            </li>
          </ul>
        </div>
        <div className="footer-middle-signup">
          <h3 className="footer-tille">Newsletter Signup</h3>
          <p>Subscribe to our newsletter and get 10% off your first purchase</p>
          <form action="" className="email-submit">
            <input type="email" name="email" placeholder="Your email address..." />
            <button type="submit" className="btn-submit btn-primary">
              Subscribe
            </button>
          </form>
          <ul className="d-flex logo-list">
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/amazon.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/american_express.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/apple_pay.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/bitcoin.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/paypal.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/f_pay.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/sofort.svg"
                alt="logo"
              />
            </li>
            <li>
              <img
                src="https://themes.the4.co/kalles-html/assets/images/home-sport/visa.svg"
                alt="logo"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container d-flex justify-content-between">
          <p>Copyright © 2021 TTB Store.</p>
          <ul className="d-flex footer-menu">
            <li>
              <a href=".">Shop</a>
            </li>
            <li>
              <a href=".">About Us</a>
            </li>
            <li>
              <a href=".">Contact US</a>
            </li>
            <li>
              <a href=".">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterView;
