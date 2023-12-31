import { MenuDataType } from "../types/CommonTpye";

export const menuData: MenuDataType =
{
   menu_aside: [
      {
         menu_item: {
            menu_link: {
               "href": "/admin",
               "icon": "material-icons md-home",
               "text": "Dashboard"
            }
         },
      },
      {
         menu_item: {
            menu_link: {
               "icon": "material-icons md-shopping_bag",
               "text": "Products"
            },
            "submenu": {
               "links": [
                  { "href": "/admin/products/list", "text": "Product list" },
                  { "href": "/admin/products/category", "text": "Categories Product" },
                  { "href": "/admin/products/color", "text": "Colors" },
                  { "href": "/admin/products", "text": "Add products" }
               ]
            }
         },

      },
      {
         menu_item: {
            menu_link: {
               "href": "/admin/orders",
               "icon": "material-icons md-shopping_cart",
               "text": "Orders"
            },

         }
      },
      {
         menu_item: {
            menu_link: {

               "icon": "material-icons md-store",
               "text": "Sellers"
            },
            "submenu": {
               "links": [
                  { "href": "page-sellers-cards.html", "text": "Sellers cards" },
                  { "href": "page-sellers-list.html", "text": "Sellers list" },
                  { "href": "page-seller-detail.html", "text": "Seller profile" }
               ]
            }
         }
      },
      {
         menu_item: {
            menu_link: {
               "icon": "material-icons md-person",
               "text": "Customer"
            },
            "submenu": {
               "links": [
                  { "href": "/admin/account", "text": "Account" },
                  { "href": "/admin/customer", "text": "Customer infomation" },
               ]
            }
         }
      },
      {
         menu_item: {
            menu_link: {
               "icon": "material-icons md-comment",
               "text": "Blogs"
            },
            "submenu": {
               "links": [
                  { "href": "/admin/blogs", "text": "Add Blog" },
                  { "href": "/admin/blogs/list", "text": "Blog List" },
                  { "href": "/admin/blogs/category", "text": "Blog Category List" }
               ]
            }
         }
      },
      {
         menu_item: {
            menu_link: {
               "href": "/admin/brands",
               "icon": "material-icons md-stars",
               "text": "Brands"
            },

         }
      },
      {
         menu_item: {
            menu_link: {
               "icon": "material-icons md-pie_chart",
               "text": "Statistics"
            }
         }
      }
   ]
}