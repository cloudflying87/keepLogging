import React from 'react';
import './style.css'

const Button = ({ text, handleInputChange, btnId, btnClass }) => {



    return (
        <button
        onClick={handleInputChange}
        id={btnId}
        className={btnClass}
        >
            {text}
        </button>
    )
}

export default Button;