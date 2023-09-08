import { useState } from "react";
import { MenuItem, MenuItemLink } from "../../types/CommonTpye"
import {Link} from "react-router-dom"
interface props {
   item: MenuItem
}
export const MenuSideBar = ({ item }: props) => {
   const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    
   const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
   };

   return (
      <li className={`menu-item ${item.menu_item.submenu ? "has-submenu" : ""} `} onClick={toggleSubMenu}>
         <Link className="menu-link" to={item.menu_item.menu_link.href || "/admin"}>
            <i className={`${item.menu_item.menu_link.icon} icon`}></i>
            <span className="text">{item.menu_item.menu_link.text}</span>
         </Link>
         {item.menu_item.submenu && (
            <div className="submenu" style={{ display: `${isSubMenuVisible ? "block" : "none"}` }}>
               {item.menu_item.submenu.links.map((sub_item: MenuItemLink,index:number) => {
                  return (
                     <Link to={sub_item.href || "/admin"} key={index+1000}>{sub_item.text}</Link>
                  )
               })}
            </div>
         )}
         
      </li>
   )
}
