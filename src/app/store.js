import { configureStore } from '@reduxjs/toolkit';
import dashBoardReducer from '../common/components/dashBoardSlice';
import productReducer from '../common/components/ListProduct/productSlice';
import adminReducer from '../features/Admin/adminSlice';
import authReducer from '../features/Auth/authSlice';
import employeeReducer from '../features/Employee/employeeSlice';
import profileReducer from '../features/Profile/profileSlice';
import productDetail from "../common/components/ProductDetail/ProductDetailSlice"

const rootReducer = {
  dashBoard: dashBoardReducer,
  admin: adminReducer,
  auth: authReducer,
  profile: profileReducer,
  products: productReducer,
  productDetail,
  employee: employeeReducer,
}

export default configureStore({
  reducer: rootReducer,
});
