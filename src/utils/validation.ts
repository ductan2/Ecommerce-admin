
import * as yup from "yup"


export const schemaWithTitle = (title: string) => {
   return yup.object().shape({
      title: yup.string().required(`${title} is required`).max(50, `${title} is too long`),
   });
}


export const schemaBrand = yup.object().shape({
   title: yup.string().required("Brand name is required").max(50, "Name is too long"),
});

export const productSchema = yup.object().shape({
   title: yup.string().required("Title is Required"),
   description: yup.string().required("Description is Required"),

   price: yup.number().required("Price is Required"),
   quantity: yup.number().required("Quantity is Required"),
   brand: yup.string().required("Brand is Required").defined(),
   sold: yup.number().default(0),
   trending: yup.boolean().default(false),
   featured: yup.boolean().default(false),
   rating_distribution: yup.number().default(5),
});
export const schemaBlog = yup.object().shape({
   title: yup.string().required("Title is Required"),
   description: yup.string().required("Description is Required"), // Assuming TrustedHTML is some kind of string or can be validated as a string
   category: yup.array().of(yup.string()).min(1).required("Category is Required"),
});

