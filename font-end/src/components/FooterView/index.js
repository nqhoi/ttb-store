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
import { Link } from "react-router-dom";

export default function FooterView() {
  return (
    <div className="footer">
      <div className="d-flex flex-wrap container justify-content-between footer-middle">
        <div className="middle-contact">
          <h3>Contact</h3>
          <i className="fa-solid fa-caret-down"></i>
          <ul className="contact-list">
            <li className="contact-item">
              <Link to="/" className="logo">
                <img src={logo} alt="logo" className="logo-image" />
              </Link>
            </li>
            <li className="contact-item">
              <GoldOutlined />
              <span>184 Lê Độ, Thanh Khê, Đà Nẵng</span>
            </li>
            <li className="contact-item">
              <MailFilled />
              <Link to="/"> contact@company.com</Link>
            </li>
            <li className="contact-item">
              <PhoneOutlined />
              <span>+001 2233 456</span>
            </li>
            <li className="contact-item">
              <ul className="contact-list-icon">
                <li className="contact-icon">
                  <Link to="/">
                    <FacebookOutlined />
                  </Link>
                </li>
                <li className="contact-icon">
                  <Link to="/">
                    <TwitterOutlined />
                  </Link>
                </li>
                <li className="contact-icon">
                  <Link to="/">
                    <InstagramOutlined />
                  </Link>
                </li>
                <li className="contact-icon">
                  <Link to="/">
                    <YoutubeOutlined />
                  </Link>
                </li>
                <li className="contact-icon">
                  <Link to="/">
                    <MessageOutlined />
                  </Link>
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
              <Link to="/">Celebrations</Link>
            </li>
            <li>
              <Link to="/">Events</Link>
            </li>
            <li>
              <Link to="/">Home Decor</Link>
            </li>
            <li>
              <Link to="/">Seasonal Bouquet</Link>
            </li>
            <li>
              <Link to="/">Wedding Decor</Link>
            </li>
          </ul>
        </div>
        <div className="middle-col">
          <h3 className="footer-tille">Useful links</h3>
          <i className="fa-solid fa-caret-down"></i>
          <ul>
            <li>
              <Link to="/">Contact us</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Shipping &amp; Delivery</Link>
            </li>
            <li>
              <Link to="/">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/">Returns &amp; Exchanges</Link>
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
          <p>Copyright © 2022 TTB Store.</p>
          <ul className="d-flex footer-menu">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact US</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
