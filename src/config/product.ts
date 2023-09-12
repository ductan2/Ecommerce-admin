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
                  { "href": "/admin/products/color", "text": "Colors" }
               ]
            }
         },

      },
      {
         menu_item: {
            menu_link: {
               "icon": "material-icons md-shopping_cart",
               "text": "Orders"
            },
            "submenu": {
               "links": [
                  { "href": "/admin/orders", "text": "Order list" },
                  { "href": "page-orders-2.html", "text": "Order list 2" },
                  { "href": "page-orders-detail.html", "text": "Order detail" }
               ]
            }
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

               "icon": "material-icons md-add_box",
               "text": "Add product"
            },
            "submenu": {
               "links": [
                  { "href": "page-form-product-1.html", "text": "Add product 1" },
                  { "href": "page-form-product-2.html", "text": "Add product 2" },
                  { "href": "page-form-product-3.html", "text": "Add product 3" },
                  { "href": "page-form-product-4.html", "text": "Add product 4" }
               ]
            }
         }
      },
      {
         menu_item: {
            menu_link: {

               "icon": "material-icons md-monetization_on",
               "text": "Transactions"
            },
            "submenu": {
               "links": [
                  { "href": "page-transactions-1.html", "text": "Transaction 1" },
                  { "href": "page-transactions-2.html", "text": "Transaction 2" }
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
                  { "href": "/admin/blogs/add-blog", "text": "Add Blog" },
                  { "href": "/admin/blogs/blog-list", "text": "Blog List" },
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