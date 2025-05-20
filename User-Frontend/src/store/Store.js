import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; 
import authReducer from '../services/Authentication/authReducers';
import blogReducer from '../services/Blogs/BlogReducer';
import enquiryReducer from '../services/Enquiry/EnquiryReducer';
import categoryReducer from '../services/Category/CategoryReducers';
import colorReducer from '../services/Color/ColorReducer';
import productReducer from '../services/Products/ProductReducer';
import wishlistReducer from '../services/Wishlist/WishlistReducers';
import cartReducer from '../services/Cart/CartReducer';
import coupanReducer from '../services/Coupan/CoupanReducer';
import manageAddressReducer from '../services/Manage-Address/Manage-AddressReducer';
import orderReducer from '../services/Order/OrderReducer';
import ratingReducer from '../services/Rating/RatingReducer';
import verifyReducer from '../services/Verification/VerifyReducer';


export const logout = () => ({ type: 'LOGOUT' });

const appReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  enquiry: enquiryReducer,
  category: categoryReducer,
  color: colorReducer,
  product: productReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  Coupan: coupanReducer,
  Address: manageAddressReducer,
  order: orderReducer,
  rating: ratingReducer,
  verify: verifyReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};


const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
