type image = {
   url: string;
   asset_id: string;
   public_id: string;
}

export interface Product {
   _id: string;
   title: string;
   slug: string;
   description: string;
   price: number;
   brand: string;
   category: string[];
   quantity: number;
   images: image[];
   sold: number;
   color: string[];
   rating_distribution: number;
   ratings: number[];
   created_at: string;
   updated_at: string;
}