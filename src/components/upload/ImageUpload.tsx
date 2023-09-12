import { RiDeleteBin6Line } from 'react-icons/ri'
import { Loading } from '../loading/Loading'

type props = {
   image?: string
   handleDeleteImage?: () => void
   isLoadingImage?: boolean
}

const ImageUpload = ({ image, handleDeleteImage, isLoadingImage }: props) => {
   return (
      <div className="image-upload">
         {!image || image === undefined || image === "" ?
            (!isLoadingImage ? <img src={"/img-upload.png"} alt="img" className="img-fluid mt-5" /> : <Loading isFull />)
            :
            <div onClick={handleDeleteImage}>
               <img src={image} alt="img" className="img-fluid has-image mt-5" />
               <RiDeleteBin6Line className="icon-upload-delete" />
            </div>
         }
      </div>
   );
};

export default ImageUpload;
1