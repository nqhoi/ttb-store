import React from "react";
import { useDispatch } from "react-redux";
import cartReducer from "reducers/cart";
import CartItem from "./CartItem";
import "./CartOverview.scss";
import PropTypes from 'prop-types';


CartOverview.defaultProps = {
  carts: [],
};

function CartOverview(props) {
  const { carts } = props;
  const dispatch = useDispatch();

  //: xoá 1 sản phẩm trong cart
  const onDelCartItem = (key) => {
    dispatch(cartReducer.delCartItem(key));
  };

  //: cập nhật số lượng sản phẩm trong cart
  const onUpdateNumOfProd = (key, value) => {
    dispatch(cartReducer.updateCartItem(key, value || 1));
  };

  return (
    <>
      {carts.map((item, index) => (
        <div key={index} className="m-b-12">
          <CartItem
            index={index}
            {...item}
            onDelCartItem={onDelCartItem}
            onUpdateNumOfProd={onUpdateNumOfProd}
          />
        </div>
      ))}
    </>
  );
}

CartOverview.propTypes = {
  carts: PropTypes.array,
};

export default CartOverview;
