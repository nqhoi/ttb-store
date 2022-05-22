import { Spin } from "antd";
import productApi from "apis/productApi";
import GlobalLoading from "components/Loading/Global";
import ProductDetail from "components/ProductDetail";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isNotFoundProduct, setIsNotFoundProduct] = useState(false);

  // Lấy sản phẩm
  useEffect(() => {
    document.querySelector("body").scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let isSubscribe = true;
    const getProduct = async (id) => {
      try {
        const result = await productApi.getProduct(id);
        if (result && isSubscribe) {
          const { data } = result;
          setProduct(data);
        }
      } catch (error) {
        if (isSubscribe) setIsNotFoundProduct(true);
      }
    };
    getProduct(productId);
    if (isSubscribe) setProduct(null);

    return () => (isSubscribe = false);
  }, [productId])

  return (
    <div>
      <>
        {product ? (
          <ProductDetail products={product} />
        ) : (
          <div className="min-h-100">
            <GlobalLoading content="Đang tải sản phẩm ..." />
          </div>
        )}
        {isNotFoundProduct && <Redirect to="/not-found" />}
      </>
    </div>
  );
}

export default ProductDetailPage;
