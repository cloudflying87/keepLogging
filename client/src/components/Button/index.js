import React from 'react';
import './style.css'

const Button = ({ text, handleClick, btnId, btnClass }) => {



    return (
        <button
        onClick={handleClick}
        id={btnId}
        className={btnClass}
        >
            {text}
        </button>
    )
}

export default Button;