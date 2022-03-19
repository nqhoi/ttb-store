import React from "react";

function Posts(props) {
  const { content } = props;
  return (
    <>
      {content == null ? (
        <h3 className="m-t-16">Thông tin đang được cập nhật</h3>
      ) : (
        <>
          <h2 className="m-t-16 m-b-8 font-weight-700">{content.title}</h2>
          {content.desc &&
            content.desc.map((item, index) => (
              <div key={index}>
                <p
                  className="t-justify desc-detail"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {item.content}
                </p>
                <img
                  className="transform-margin m-tb-8"
                  style={{  maxWidth: "100%" }}
                  src={item.photo}
                  alt=""
                />
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default Posts;
