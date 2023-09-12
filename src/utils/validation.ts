
import * as yup from "yup"


export const schemaWithTitle = (title: string) => {
   return yup.object().shape({
      title: yup.string().required(`${title} is required`).max(50, `${title} is too long`),
   });
}


export const schemaBrand = yup.object().shape({
   title: yup.string().required("Brand name is required").max(50, "Name is too long"),
});


