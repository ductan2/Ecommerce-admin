import { Product } from "./product.type";

interface Payment_intent_type {
   id: string
   amount: number;
   currency: string; // Assumed to be an ObjectId or a string
   created: string;
}

interface ProductOrder {
   product: Product;
   count: number;
   price: number;
}
export enum statusOrder {
   CASH_ON_DELIVERY = "Cash on delivery",
   PROCESSING = "Processing",
   CANCELLED = "Cancelled",
   DELIVERED = "Delivered",
}
export interface Order {
   _id: string; // Assumed to be a string, but it could be an ObjectId
   products: ProductOrder[];
   payment_intent: Payment_intent_type;
   order_status: statusOrder;
   orderby: string; // Assumed to be a string, but it could be an ObjectId
   created_at: string; // You may want to use a Date type if you're storing dates
   updated_at: string; // You may want to use a Date type if you're storing dates
}