import React from 'react';
import Button from '../Button/index';
import './style.css'

const Modal = ({ handleClick, results }) => {


    return (
        <div className='modal'>
            <div className='modalContent'>
                <Button
                    className='modalBtn'
                    btnId='closeModal'
                    text='X'
                    handleClick={handleClick}
                />
                <p>

                {Object.values(results)}
                </p>
            </div>
        </div>
    )
}

export default Modal;