// main.js
const nodemailer = require('nodemailer');

// configure option
const option = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(option);

// send email
const sendEmail = async ({ to, subject, text, html, ...rest }) => {
  try {
    const res = await transporter.verify();
    if (res) {
      //config mail
      const mail = {
        //sender access
        from: '"TTB Store" <no-reply@accounts.ttb-store.com>',
        //receiver access
        to,
        //subject
        subject,
        //content text
        text,
        //html
        html,
        //others
        ...rest,
      };
      //Tiến hành gửi email
      const info = await transporter.sendMail(mail);
      if (info) {
        return true;
      }
    }
  } catch (err) {
    console.error('ERROR MAILER: ', err);
    return false;
  }
};

const headerHtmlMail = `<h1 style="color: #4c649b; font-size: 48px; border-bottom: solid 2px #ccc;padding-bottom: 10px; text-align: center">
      TTB Store<br />
    </h1>`;
const footerHtmlVerifyMail = `<h3 style="color: red">
        Chú ý: Không đưa mã này cho bất kỳ ai,
        có thể dẫn đến mất tài khoản.<br />
        Mã chỉ có hiệu lực <i>10 phút </i> từ khi bạn nhận được mail.
    </h3>
    <h1>Cảm ơn.</h1>`;

// gửi mã xác nhận
const htmlSignupAccount = (token) => {
  return `<div style="max-width: 1000px; margin: 0 auto">
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Mã xác nhận đăng ký tài khoản cho website TTB Store của anh (chị).<br />
        Cảm ơn vì đã ghé thăm TTB Store <3
    </h2>
    <h3 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h3>
  ${footerHtmlVerifyMail}
  </div>`;
};

// gửi mã đổi mật khẩu
const htmlResetPassword = (token) => {
  return `<div style="max-width: 1000px; margin: 0 auto">
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Cửa hàng TTB Store đã nhận được yêu cầu lấy lại mật khẩu từ quý khách.<br />
        Đừng lo lắng, hãy nhập mã này để khôi phục:
    </h2>
    <h1 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h1>
    ${footerHtmlVerifyMail}
  </div>`;
};

// gửi thông báo đăng nhập sai quá nhiều
const htmlWarningLogin = () => {
  return `<div style="max-width: 1000px; margin: 0 auto">
   ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin Chào anh (chị),<br />
        Cửa hàng nghi ngờ có ai đó đã cố gắng đăng nhập vào tài khoản của quý khách.<br />
        Nếu quý khác không nhớ mật khẩu hãy nhấn vào "Quên mật khẩu" để lấy lại mật khẩu<br/>
    </h2>
    <h1>Cảm ơn.</h1>
  </div>`;
};

// gửi thông báo đặt hàng thành công
const htmlOrderSuccess = (account, order, addressStr) => {
  const {deliveryAdd} = order;
  return `<div style="max-width: 1000px; margin: 0 auto">
    ${headerHtmlMail}
    <div style="padding: 10px 0; margin-bottom: 10px; border-bottom: solid 2px #ccc">
      <p>Xin chào <b>${deliveryAdd.name}</b>,</p>
      <p>TTB Store xin thông báo đã nhận được đơn đặt hàng mang mã số <b>${order.orderCode}</b> của Anh/chị.</p>
      <p>Đơn hàng của Anh/chị đã được tiếp nhận, chúng tôi sẽ nhanh chóng liên hệ với Anh/chị.
        <br />
        <strong> VUI LÒNG GIỮ ĐIỆN THOẠI, TTB Store SẼ GỌI XÁC NHẬN ĐƠN HÀNG TRONG THỜI GIAN SỚM NHẤT </strong>
      </p>
    </div>
    <h3>Thông tin giao nhận</h3>
    <div style="text-align:left; max-width: 600px; margin: 0 auto; display: flex; color: #222">
      <div style="width: 50%; word-wrap: break-word; margin-right: 10px">
        <p>Họ tên: ${deliveryAdd.name}</p>
        <p>Điện thoại: ${deliveryAdd.phone}</p>
        <p>Email: ${account.email}</p>
        <p>Địa chỉ: ${addressStr}</p>
      </div>
      <div style="width: 50% ;word-wrap: break-word;">
        <p>
          Phương thức thanh toán: </br>
          Thanh toán bằng tiền mặt khi nhận hàng (COD)
        </p>
        <p>
          Phương thức vận chuyển: </br>
          Tốc độ tiêu chuẩn
        </p>
      </div>
    </div>
    <h3>Tra cứu - Huỷ đơn hàng</h3>
    <p>Bất cứ lúc nào, bạn có thể tra cứu chi tiết và trạng thái các đơn hàng đã mua bằng cách truy cập website trang quản lý đơn hàng.
      <br/>
      Bạn cũng có thể chủ động huỷ đơn hàng ngay tại trang quản lý đơn hàng, nhưng lưu ý là việc này chỉ có thể thực hiện được trước khi đơn hàng của bạn được chuyển qua giao nhận.
    </p>
    <p>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại ttbstore@gmail.com hoặc qua hotline miễn phí 1900 1900</p>

    <div style="text-align:right">
      <p>Trân trọng,</p>
      <p style="color: #4c649b;">TTB STORE</p>
    </div>
  </div>`;
};

module.exports = {
  sendEmail,
  htmlSignupAccount,
  htmlResetPassword,
  htmlWarningLogin,
  htmlOrderSuccess
};