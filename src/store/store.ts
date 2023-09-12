import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import customerReducer from "../features/customer/customerSlice"
import productReducer from "../features/product/productSlice"
import categoryProcReducer from "../features/categoryProduct/categoryProcSlice"
import BlogCategoryReducer from "../features/blogCategory/blogCategorySlice"
import ColorReducer from "../features/color/colorSlice"
import BlogReducer from "../features/blog/blogSlice"
import BrandReducer from "../features/brand/brandSlice"
import orderSlice from "../features/order/orderSlice"
import uploadSlice from "../features/uploads/uploadSlice"
import { useDispatch } from "react-redux"

export const store = configureStore({
   reducer: {
      auth: authReducer,
      customer: customerReducer,
      products: productReducer,
      categoryProduct: categoryProcReducer,
      blogCategory: BlogCategoryReducer,
      colors:ColorReducer,
      blog:BlogReducer,
      brand:BrandReducer,
      orders:orderSlice,
      upload:uploadSlice
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch= () => useDispatch<AppDispatch>()
