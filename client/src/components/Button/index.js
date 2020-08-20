import React from 'react';
import './style.css'

const Button = ({ text, onClick, btnId, btnClass }) => {



    return (
        <button
        onClick={onClick}
        id={btnId}
        className={btnClass}
        >
            {text}
        </button>
    )
}

export default Button;