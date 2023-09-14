
import * as yup from "yup"


export const schemaWithTitle = (title: string) => {
   return yup.object().shape({
      title: yup.string().required(`${title} is required`).max(50, `${title} is too long`),
   });
}


export const schemaBrand = yup.object().shape({
   title: yup.string().required("Brand name is required").max(50, "Name is too long"),
});

export const shemaProduct = yup.object().shape({
   title: yup.string().required("Title is Required"),
   description: yup.string().required("Description is Required"),
   price: yup.number().required("Price is Required"),
   brand: yup.string().required("Brand is Required"),
   category: yup
      .array()
      .min(1, "Pick at least one category")
      .required("Category is Required"),
   tags: yup.string().required("Tag is Required"),
   images: yup.array().min(1, "Pick at least one image").required("Image is Required"),
   color: yup
      .array()
      .min(1, "Pick at least one color")
      .required("Color is Required"),
   quantity: yup.number().required("Quantity is Required"),
});

