
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Login } from "./components/login/Login"
import { Layout } from "./pages/Layout"
import { Forgotpassword } from "./components/login/Forgotpassword"
import { Dashboard } from "./pages/Dashboard"
import { Products } from "./pages/Products"
import { ErrorPage } from "./pages/ErrorPage"
import { CategoriesProduct } from "./pages/CategoriesProduct"
import { Customer } from "./pages/Customer"
import { BlogCategory } from "./pages/BlogCategory"
import { Colors } from "./pages/Colors"
import { Brands } from "./pages/ProductAdd/Brands"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<Forgotpassword />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/product-category" element={<CategoriesProduct />} />
            <Route path="/admin/blogs/category" element={<BlogCategory />} />
            <Route path="/admin/color-product" element={<Colors />} />
            <Route path="/admin/brands" element={<Brands />} />

          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
