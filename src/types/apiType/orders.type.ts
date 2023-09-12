import { Product } from "./product.type";

interface ProductType {
   count: number;
   color: string; // Assumed to be an ObjectId or a string
   price: number;
}

interface ProductType {
   id: string;
   method: string;
   amount: number;
  
   status: string;
   created: string; // You may want to use a Date type if you're storing dates
   currency: string;
}
export interface Order {
   _id: string; // Assumed to be a string, but it could be an ObjectId
   products: ProductType[];
   payment_intent: ProductType;
   order_status: string;
   orderby: string; // Assumed to be a string, but it could be an ObjectId
   created_at: string; // You may want to use a Date type if you're storing dates
   updated_at: string; // You may want to use a Date type if you're storing dates
   products_data: Product[]
}