import { useEffect } from "react";
import { createPortal } from "react-dom";
import {ModalWindow, ModalOverlay} from "./Modal.stuled"


const modalRoot = document.querySelector('#root-modal')

const Modal = ({image, alt, onClose}) => {

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
            onClose()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown);}

    })

    const backdropClick = event => {
        if (event.target === event.currentTarget) {
           onClose() 
        }
    }
    
    

   
        return createPortal(
        <ModalOverlay className="overlay" onClick={backdropClick}>
            <ModalWindow className="modal"> 
            <img src={image} alt={alt} />
            </ModalWindow>
        </ModalOverlay>, modalRoot)
    
}

export default Modal;



// export const ImageGalleryItem = ({imageUrl, tags, onClick}) => {
//     return (<GalleryItem className="gallery-item">
//       <img src={imageUrl} alt={tags} onClick={() => onClick() }/>
// </GalleryItem>)
// }