import React, { RefObject, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutSide'


type Props = {
   _id?: string
   handleDelete: (id: string) => void
   setIsOpen: (value: boolean) => void
}

export const ActionDetails = ({ _id, handleDelete,setIsOpen }: Props) => {
   const [toggle, setToggle] = useState<boolean>(false)
   const handleSetToggle = () => setToggle(!toggle)

   const domNode: RefObject<HTMLDivElement> = useClickOutside(() => {
      setToggle(false);
   });

   return (
      <td className="text-end" onClick={handleSetToggle} style={{ width: "100px" }}>
         <div ref={domNode} className="dropdown">
            <div data-bs-toggle="dropdown" className={`btn btn-light rounded btn-sm font-sm ${toggle ? "show" : ""}`}>
               <i className="material-icons md-more_horiz"></i>
            </div>
            <div className={`dropdown-menu ${toggle ? "show" : ""}`} style={{ position: "absolute", inset: " 0px auto auto 0px", transform: "translate(-123px, 35px)" }}>
               <a className="dropdown-item" href="#" onClick={()=>setIsOpen(true)}>Edit info</a>
               <a className="dropdown-item text-danger" href="#" onClick={() => handleDelete(_id as string)}>Delete</a>
            </div>
         </div>
         {/* {toggle && (
            <div className="overlay-toggle" onClick={handleClose}></div>
         )} */}
      </td>
   )
}
