import React from 'react';
import './style.css';

const Input = ({ label, labelFor, name, type, inputId, inputClass, placeholder, handleInputChange, value, size }) => {

    return (
        <div>
            <label
                htmlFor={labelFor}
            >
                {label}
            </label>
            <input
                name={name}
                type={type}
                id={inputId}
                className={inputClass}
                placeholder={placeholder}
                onChange={handleInputChange}
                value={value}
                size={size}
            />
        </div>
    )

};

export default Input;