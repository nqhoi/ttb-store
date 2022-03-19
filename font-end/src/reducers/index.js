import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';
import cartReducer from './cart';

const rootReducer = combineReducers({
  authenticate: authReducer.authReducer,
  user: userReducer.userReducer,
  carts: cartReducer.cartReducer,
});

export default rootReducer;
