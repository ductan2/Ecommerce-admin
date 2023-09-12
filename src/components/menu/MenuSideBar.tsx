import { useState } from "react";
import { MenuItem, MenuItemLink } from "../../types/CommonTpye"
import { Link } from "react-router-dom"
interface props {
   item: MenuItem
   mainUrl: string | null
}
export const MenuSideBar = ({ item, mainUrl }: props) => {
   const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
   
   const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
   };
   if(mainUrl===null){
      mainUrl="dashboard"
   }
   return (
      <li className={`menu-item ${mainUrl === item.menu_item.menu_link.text?.toLowerCase() ? "active" : ""}  ${item.menu_item.submenu ? "has-submenu" : ""} `} onClick={toggleSubMenu}>

         {item.menu_item.menu_link.href ? (
            <Link className="menu-link" to={item.menu_item.menu_link.href || ""}>
               <i className={`${item.menu_item.menu_link.icon} icon`}></i>
               <span className="text">{item.menu_item.menu_link.text}</span>
            </Link>
         ) : (
            <div className="menu-link">
               <i className={`${item.menu_item.menu_link.icon} icon`}></i>
               <span className="text">{item.menu_item.menu_link.text}</span>
            </div>
         )}
         {item.menu_item.submenu && (
            <div className="submenu" style={{ display: `${isSubMenuVisible ? "block" : "none"}` }}>
               {item.menu_item.submenu.links.map((sub_item: MenuItemLink, index: number) => {
                  return (
                     <Link to={sub_item.href || "/admin"} key={index + 1000}>{sub_item.text}</Link>
                  )
               })}
            </div>
         )}

      </li>
   )
}
