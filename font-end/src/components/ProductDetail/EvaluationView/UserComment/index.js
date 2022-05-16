import { Avatar, Button, Comment, Dropdown, Menu, Popconfirm, Rate, Col, Input } from "antd";
import constants from "constants/index";
import helpers from "helpers";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const { TextArea } = Input;

function UserComment(props) {
  const { comment, onDelete, onEdit } = props;
  const { _id, author, content, rate, time } = comment;
  const { name, avt } = author;
  const user = useSelector((state) => state.user);
  const isReduceCmt = content.length >= 200 ? true : false;
  const [isMore, setIsMore] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentComment, setCurrentComment] = useState({})
  const [currentContent, setCurrentContent] = useState('')
  console.log(currentComment, isUpdating)

  const menu = (
    <Menu className="m-t-24">
        <Menu.Item key={1}
          onClick={() => {
            setIsUpdating(true)
            setCurrentComment(comment)
            setCurrentContent(content)
          }}>
            Chỉnh sửa
        </Menu.Item>
        <Menu.Item key={2}>
          <Popconfirm onConfirm={() => onDelete(_id)} title="Bạn có muốn xóa nhận xét không ?" okText="Yes" cancelText="No">
            Xóa
          </Popconfirm>
        </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* đăng nhập để nhận xét */}
      {isLoggedIn && <Redirect to="/login" />}

      {/* Comment */}
      <Comment
        author={<b className="font-size-14px">{name}</b>}
        avatar={
          <Avatar
            // src={avt !== "" ? avt : constants.DEFAULT_USER_AVT}
            src={constants.DEFAULT_USER_AVT}
            alt={name}
          />
        }
        content={
          <>
            {rate !== -1 && (
              <>
                <Rate
                  defaultValue={rate + 1}
                  disabled
                  style={{ fontSize: 14 }}
                />
                {/* <h3>{helpers.convertRateToText(rate)}</h3> */}
              </>
            )}

            {isUpdating ? (
              <Col span={24} className="d-flex">
                 <TextArea
                    maxLength={constants.MAX_LEN_COMMENT}
                    autoSize
                    showCount
                    allowClear
                    value={currentContent}
                    id="commentArea"
                    placeholder="Nhập nhận xét của bạn"
                    size="large"
                    className="flex-grow-1 m-r-16"
                    onChange={(e) => setCurrentContent(e.target.value)}
                  />
                  <Button
                    type="primary"
                    size="large"
                    style={{ flexBasis: 122 }}
                    onClick={() => {
                      onEdit(currentComment._id, currentContent)
                      setIsUpdating(false)
                    }}
                  >
                    Gửi nhận xét
                  </Button>
                  <Button className="m-l-8"
                    type="primary"
                    size="large"
                    style={{ flexBasis: 122 }}
                    onClick={() => setIsUpdating(false)}
                  >
                    Hủy bỏ
                  </Button>
              </Col>
            ) : (
              <p className="t-justify">
                {isMore ? content : content.slice(0, 200)}
                {isReduceCmt && (
                  <Button type="link" onClick={() => setIsMore(!isMore)}>
                    {isMore ? "Thu gọn" : "Xem thêm"}
                  </Button>
                )}
              </p>
            )}
          </>
        }
        datetime={
          <div className='d-flex align-items-center'>
            <span>{helpers.formatDate(time)}</span>
            {user.fullName === name && (
              <Dropdown overlay={menu} placement="bottomLeft">
                <span className="m-l-8 font-size-20px" >
                  ...
                </span>
              </Dropdown>
            )}
          </div>
        }
      />
    </>
  );
}

export default UserComment;
