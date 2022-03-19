import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import constants from "constants/index";
import { Button, Col, message, Pagination, Progress, Rate, Row, Input } from "antd";
import commentApi from "apis/commentApi";
import helpers from "helpers";
import { Link } from "react-router-dom";
import UserComment from "./UserComment";
import "./EvaluationView.scss";

const { TextArea } = Input;

EvaluationView.defaultProps = {
  rates: [0, 0, 0, 0, 0],
};

function EvaluationView(props) {
  const { rates, cmtList, productId } = props;
  const { isAuth } = useSelector((state) => state.authenticate);
  const user = useSelector((state) => state.user);
  const [cmtListState, setCmtListState] = useState(cmtList);

  const [cmt, setCmt] = useState("");
  const star = useRef(0);
  const starAvg = helpers.calStar(rates).toFixed(1);
  const rateTotals = rates.reduce((a, b) => a + b, 0);

  //phân trang
  const [page, setPage] = useState(1);
  const pageTotal = Math.ceil(cmtListState.length / constants.COMMENT_PER_PAGE);
  let start = (page - 1) * constants.COMMENT_PER_PAGE;
  const cmtListSliced = cmtListState.slice(
    start,
    start + constants.COMMENT_PER_PAGE
  );

  useEffect(() => {
    setCmtListState(cmtList);
    return () => {};
  }, [cmtList]);

  //comment
  const onComment = async () => {
    try {
      const { avt, fullName } = user;
      const content = cmt.trim();
      if (content === "" && star.current === 0) {
        message.warning("Hãy nhập nhận xét của bạn");
        return;
      }
      let data = {
        author: { name: fullName, avt },
        productId,
        time: new Date().getTime(),
        content,
        rate: star.current - 1,
      };
      const response = await commentApi.postComment(data);
      if (response) {
        setCmtListState([...cmtListState, data]);
        setCmt("");
        star.current = 0;
      }
    } catch (error) {
      message.error("Nhận xét thất bại. Thử lại', 3");
    }
  };

  return (
    <Row className="EvaluationView bg-white bor-rad-8 p-16">
      {/* tiều đề */}
      <Col span={24}>
        <h2 className="font-weight-700 underline-title">Nhận xét khách hàng</h2>
      </Col>

      {/* đánh giá tổng quan */}
      <Col span={24} className="p-16">
        <span className="font-size-24px ">Đánh giá</span>
        <div className="overview d-flex p-tb-16">
          {/* tổng kết */}
          <div className="overview--total d-flex flex-direction-column align-items-center">
            <h2 className="font-size-30px">{starAvg}</h2>
            <Rate
              disabled
              defaultValue={starAvg}
              allowHalf
              style={{ fontSize: 12 }}
            />
            <p className="t-color-gray font-weight-500">
              {rateTotals} Nhận xét
            </p>
          </div>
          {/* chi tiết */}
          <div className="overview--detail d-flex flex-direction-column flex-grow-1 p-lr-16">
            {rates.map((item, index) => (
              <div key={index} className="d-flex justify-content-between">
                <Rate
                  disabled
                  defaultValue={index + 1}
                  style={{ fontSize: 14, flexBasis: 150 }}
                />
                <Progress
                  percent={(item / rateTotals) * 100}
                  type="line"
                  showInfo={false}
                  style={{ width: 172 }}
                />
                <span className="p-l-8 t-color-gray">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Col>

      {/* Xem bình luận, nhận xét */}
      <Col span={24}>
        {cmtListSliced.map((item, index) => (
          <UserComment key={index} comment={item} />
        ))}
        {pageTotal > 1 && (
          <Pagination
            className="t-right m-b-16"
            defaultCurrent={1}
            total={pageTotal}
            pageSize={1}
            onChange={(e) => setPage(e)}
          />
        )}
      </Col>

      {/* bình luận */}
      <Col span={24} className="d-flex">
        {isAuth ? (
          <>
            <TextArea
              maxLength={constants.MAX_LEN_COMMENT}
              autoSize
              showCount
              allowClear
              value={cmt}
              id="commentArea"
              placeholder="Nhập nhận xét của bạn"
              size="large"
              className="flex-grow-1 m-r-16"
              onChange={(e) => setCmt(e.target.value)}
            />
            <Rate
              allowClear
              className="m-r-16"
              onChange={(e) => (star.current = e)}
            />
            <Button
              type="primary"
              size="large"
              style={{ flexBasis: 122 }}
              onClick={onComment}
            >
              Gửi nhận xét
            </Button>
          </>
        ) : (
          <Button type="link" size="large">
            <Link to={constants.ROUTES.LOGIN}>Đăng nhập để nhận xét</Link>
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default EvaluationView;
