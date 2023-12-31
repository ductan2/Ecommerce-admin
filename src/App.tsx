
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Login } from "./components/login/Login"
import { Layout } from "./pages/Layout"
import { Forgotpassword } from "./components/login/Forgotpassword"
import { Dashboard } from "./pages/Dashboard"
import { Products } from "./pages/Products"
import { ErrorPage } from "./pages/ErrorPage"

import { Customer } from "./pages/Customer"
import { BlogCategory } from "./pages/Blog/BlogCategory"
import { Colors } from "./pages/Colors"
import { Brands } from "./pages/Product/Brands"
import { Orders } from "./pages/Product/Orders"
import { Upload } from "./components/upload/Upload"
import { CategoriesProduct } from "./pages/CategoriesProduct"
import { AddBlogCategory } from "./pages/Blog/Blogs"
import { BlogList } from "./pages/BlogList"
import { ProductForm } from "./pages/Product/FormProduct"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<Forgotpassword />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/products/list" element={<Products />} />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/products/category" element={<CategoriesProduct />} />
            <Route path="/admin/products/:id?" element={<ProductForm />} />
            <Route path="/admin/blogs/category" element={<BlogCategory />} />
            <Route path="/admin/blogs/:id?" element={<AddBlogCategory />} />
            {/* { "href": "/admin/products/color */}
            <Route path="/admin/blogs/list" element={<BlogList />} />
            <Route path="/admin/products/color" element={<Colors />} />
            <Route path="/admin/brands" element={<Brands />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/uploads" element={<Upload />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
