
import axios from "axios";
import { backend_url } from "../../utils/dir";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadImageServices = async (data: any) => {

  const response = await axios.post(`${backend_url}/uploads`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data;
};
const deleteImage = async (id: string) => {
  const response = await axios.delete(`${backend_url}/uploads/delete-image/${id}` );
  return response.data;
};
const uploadServices = {
  uploadImageServices,
  deleteImage

}
export default uploadServices;