
import { Link } from "react-router-dom";
import { MenuSideBar } from "../components/menu/MenuSideBar";
import { MenuItem } from "../types/CommonTpye";
import { menuData } from "../config/product";

type props = {
   toggleSidebar: () => void
   isSidebarVisible: boolean
}
export const Sidebar = ({ toggleSidebar, isSidebarVisible }: props) => {


   return (
      <>
         <div className="aside-top" >
            <Link to="/admin" className="brand-wrap">
               <img src="assets/imgs/theme/logo.svg" className="logo" alt="Nest Dashboard" />
            </Link>
            <div>
               {isSidebarVisible && (
                  <button className="btn btn-icon btn-aside-minimize" onClick={toggleSidebar}>
                     <i className="text-muted material-icons md-menu_open"></i>
                  </button>

               )}
            </div>
         </div>
         <nav>
            <ul className="menu-aside" >
               {
                  menuData.menu_aside.map((item: MenuItem, index: number) => {
                     return (
                        <MenuSideBar key={index} item={item} />
                     )
                  })
               }
            </ul>
            <hr />
            <ul className="menu-aside">
               <li className="menu-item has-submenu">
                  <a className="menu-link" href="#">
                     <i className="icon material-icons md-settings"></i>
                     <span className="text">Settings</span>
                  </a>
                  <div className="submenu">
                     <a href="page-settings-1.html">Setting sample 1</a>
                     <a href="page-settings-2.html">Setting sample 2</a>
                  </div>
               </li>
               <li className="menu-item">
                  <a className="menu-link" href="page-blank.html">
                     <i className="icon material-icons md-local_offer"></i>
                     <span className="text"> Starter page </span>
                  </a>
               </li>
            </ul>
            <br />
            <br />
         </nav>
      </>
   )
}
