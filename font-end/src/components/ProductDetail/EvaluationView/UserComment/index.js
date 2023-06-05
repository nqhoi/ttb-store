import { Avatar, Button, Comment, Rate } from "antd";
import constants from "constants/index";
import helpers from "helpers";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function UserComment(props) {
  const { comment } = props;
  const { author, content, rate, time } = comment;
  const { name } = author;
  // const user = useSelector((state) => state.user);
  const isReduceCmt = content.length >= 200 ? true : false;
  const [isMore, setIsMore] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  // const [currentComment, setCurrentComment] = useState({});
  // const [currentContent, setCurrentContent] = useState("");

  // const menu = (
  //   <Menu className="m-t-24">
  //     <Menu.Item
  //       key={1}
  //       onClick={() => {
  //         setIsUpdating(true);
  //         setCurrentComment(comment);
  //         setCurrentContent(content);
  //       }}
  //     >
  //       Chỉnh sửa
  //     </Menu.Item>
  //     <Menu.Item key={2}>
  //       <Popconfirm
  //         onConfirm={() => onDelete(_id)}
  //         title="Bạn có muốn xóa nhận xét không ?"
  //         okText="Yes"
  //         cancelText="No"
  //       >
  //         Xóa
  //       </Popconfirm>
  //     </Menu.Item>
  //   </Menu>
  // );

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

            <p className="t-justify">
              {isMore ? content : content.slice(0, 200)}
              {isReduceCmt && (
                <Button type="link" onClick={() => setIsMore(!isMore)}>
                  {isMore ? "Thu gọn" : "Xem thêm"}
                </Button>
              )}
            </p>
          </>
        }
        datetime={<span>{helpers.formatDate(time)}</span>}
      />
    </>
  );
}

export default UserComment;
