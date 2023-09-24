import { Navigate, Outlet, } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"

import { Sidebar } from "./Sidebar"
import { useState } from "react"
import { RefObject } from "react"
import useClickOutside from "../hooks/useClickOutSide";



export const Layout = () => {


  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const domNode: RefObject<HTMLUListElement> = useClickOutside(() => {
    setIsSidebarVisible(false);
    document.querySelector('body')?.classList.remove('offcanvas-active')
  });


  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    if (isSidebarVisible) {
      document.querySelector('body')?.classList.add('offcanvas-active')
    }
    else {
      document.querySelector('body')?.classList.remove('offcanvas-active')
    }
  }
  // const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  // if (user.email === undefined) {
  //   return <Navigate to="/admin/login" />
  // }

    const user = JSON.parse(localStorage.getItem("user")!)
    if (!user) {
      return <Navigate to="/admin/login" />
    }
    const tokenParts = user.token.split('.');
    if (tokenParts.length !== 3) {
      // Token không hợp lệ
      localStorage.clear()
      return <Navigate to="/admin/login" />
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    const expirationTime = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại (đơn vị giây)
    if (expirationTime < currentTime) {
      // Token đã hết hạn
      localStorage.clear()
      return <Navigate to="/admin/login" />
    }

  return (
    <>
      <div className={`screen-overlay ${isSidebarVisible ? "show" : ""}`}></div>
      <aside className={`mobile-header-wrapper-inner  navbar-aside ps ps--active-y ${isSidebarVisible ? "show" : ""}`} ref={domNode}>
        <Sidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
      </aside>
      <main className="main-wrap">
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
        <Footer />
      </main>
    </>
  )
}
