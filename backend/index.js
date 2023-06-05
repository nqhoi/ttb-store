// ! set environment variables
require("dotenv").config();

// ! import third-party
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const passport = require("passport");

// ! import local file
const corsConfig = require("./src/configs/corsConfig");
// const constants = require("./src/constants");
const accountApi = require("./src/routes/account.api");
const adminApi = require("./src/routes/admin.api");
const addressApi = require("./src/routes/address.api");
const loginApi = require("./src/routes/login.api");
const categoryApi = require("./src/routes/category.api");
const productApi = require("./src/routes/product.api");
const commentApi = require("./src/routes/comment.api");
const userApi = require("./src/routes/user.api");
const orderApi = require("./src/routes/order.api");
const statisticApi = require("./src/routes/statistic.api");
const VNpay = require("./src/routes/vnpay");

// ! ================== set port ================== //
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

// ! ================== setup ================== //
// app.use(express.static(path.join(__dirname, "../font-end/build")));

// const dev = app.get("env") !== "production";

// if (!dev) {
//   app.disable("x-powered-by");
//   app.use(morgan("common"));
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../font-end/build", "index.html"));
//   });
// } else {
//   app.use(morgan("dev"));
// }

// ! ================== Connect mongodb with mongoose ================== //
const mongoose = require("mongoose");
const constants = require("./src/constants");
// const MONGO_URL = dev ? process.env.MONGO_URL_LOCAL : process.env.MONGO_URL;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// ! ================== config ==================//
app.use(express.json({ limit: constants.MAX_SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(passport.initialize());

// ! ================== Listening ... ================== //
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} !!`);
});

// ! ================== Routes - Api ================== //
// api documentations
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// api trang admin
app.use("/apis/admin", adminApi);

// api liên quan đến address
app.use("/apis/address", addressApi);

// api liên quan đến account
app.use("/apis/accounts", accountApi);

// api liên quan user
app.use("/apis/user", userApi);

// api liên quan đến login
app.use("/apis/login", loginApi);

// api liên quan dến category
app.use("/apis/category", categoryApi);

// api liên quan đến product
app.use("/apis/products", productApi);

// api liên quan comment
app.use("/apis/comments", commentApi);

// api liên quan đơn hàng
app.use("/apis/orders", orderApi);

// api liên quản đến thống kê admin
app.use("/apis/statistic", statisticApi);

//
app.use("/apis/vnpay", VNpay);

// Note: Khi deploy production, việc redirect các route sẽ để react giải quyết
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../font-end/build", "index.html"));
// });
