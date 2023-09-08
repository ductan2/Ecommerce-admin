import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import customerReducer from "../features/customer/customerSlice"
import productReducer from "../features/product/productSlice"
import categoryProcReducer from "../features/categoryProduct/categoryProcSlice"
import BlogCategoryReducer from "../features/blogCategory/blogCategorySlice"
import { useDispatch } from "react-redux"
export const store = configureStore({
   reducer: {
      auth: authReducer,
      customer: customerReducer,
      products: productReducer,
      categoryProduct: categoryProcReducer,
      blogCategory: BlogCategoryReducer,
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch= () => useDispatch<AppDispatch>()
