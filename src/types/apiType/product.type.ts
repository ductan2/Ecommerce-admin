import { UploadImageType } from "../CommonTpye";

interface ratings {
   start: number;
   comment: string;
   product_id: string; // id user comment
}
export interface Product {
   _id?: string;
   title: string;
   slug?: string;
   description: string;
   price: number;
   brand: string;
   quantity: number;
   category?: string[];
   sold: number;
   images?: UploadImageType[];
   trending: boolean
   featured: boolean
   color?: string[];
   rating_distribution: number;
   ratings?: ratings[];
   created_at?: string;
   updated_at?: string;
}
