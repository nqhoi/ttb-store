import commentApi from "apis/commentApi";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EvaluationView from "components/ProductDetail/EvaluationView";

function Evaluation(props) {
  const { productId, rates } = props;

  const [cmtList, setCmtList] = useState([]);

  useEffect(() => {
    let isSubscribe = true;
    const getCommentList = async () => {
      try {
        const response = await commentApi.getCommentList(productId);
        if (response && isSubscribe) {
          setCmtList(response.data);
        }
      } catch (error) {}
    };
    getCommentList();
    return () => (isSubscribe = false);
  }, [props]);

  return (
    <div>
      <EvaluationView productId={productId} rates={rates} cmtList={cmtList} />
    </div>
  );
}

Evaluation.propTypes = {
  productId: PropTypes.string,
  rates: PropTypes.array || PropTypes.object,
};

export default Evaluation;
