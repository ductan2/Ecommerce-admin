
import Modal from 'react-modal';
import React from 'react';
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
   children?: React.ReactNode
}
export const ModalCustom = ({ modalIsOpen, setIsOpen, children }: Props) => {
   return (
      <Modal
         isOpen={modalIsOpen}
         onRequestClose={() => setIsOpen(false)}
         style={customStyles}
         contentLabel="Example Modal"
      >
         {children}
      </Modal >
   )
}
