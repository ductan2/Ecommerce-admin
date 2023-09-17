
import Modal from 'react-modal';
import { Control } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Button } from '../button/Button';
import React from 'react';
import { InputCustom } from '../input/InputCustom';
const customStyles = {
   content: {
      maxWidth: '500px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

type Props = {
   modalIsOpen: boolean
   setIsOpen: (value: boolean) => void
   title: string
   name: string
   functionSubmit: () => void
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control?: Control<any>;
   placeholder?: string
   errorMessage?: string

   children?: React.ReactNode
}
export const ModalCustomTitle = ({ modalIsOpen, setIsOpen, title, name, functionSubmit, control, placeholder, children, errorMessage }: Props) => {
   return (
      <Modal
         isOpen={modalIsOpen}
         onRequestClose={() => setIsOpen(false)}
         style={customStyles}
         contentLabel="Example Modal"
      >
         <div className='form-wrapper-modal'>
            <h2>{title}</h2>
            <form onSubmit={functionSubmit}>
               <InputCustom label={name[0].toUpperCase() + name.substring(1, name.length)} errorMessage={errorMessage} control={control} type="text" placeholder={placeholder} name={name} id="product_name" />
               {children}
               <div className='d-flex gap-5'>
                  <div className="d-grid w-50">
                     <Button type='submit' className="btn btn-primary justify-content-center"> {title}</Button>
                  </div>
                  <div className="d-grid w-50">
                     <button className="btn btn-secondary text-center justify-content-center" onClick={() => setIsOpen(false)}>Close</button>
                  </div>
               </div>
            </form>
            <AiOutlineCloseCircle className="modal-close-icon" onClick={() => setIsOpen(false)} />
         </div>
      </Modal >
   )
}
