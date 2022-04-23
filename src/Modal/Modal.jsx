/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import {useEffect} from 'react';
const Modal = ({largeUrl, handleModal}) => {
   const onModalClose = e => {
        if (e.keyCode === 27) {
            handleModal();
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', onModalClose);
            return () => {
        window.removeEventListener('keydown', onModalClose);
       } 
}, [onModalClose]);

        return (
            <div className="Overlay" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleModal();
                }
            }}>
                <div className="Modal">
                    <button className='Exits'
                    onClick={()=>{handleModal()}}
                    >x</button>
                    <img src={largeUrl} alt="" />
                </div>
            </div>
        )
    }
export default Modal