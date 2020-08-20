import React from 'react';
import './style.css';

const Input = ({ label, labelFor, name, type, inputId, inputClass, placeholder, onChange, value, size }) => {
    return (
        <>
            <label
                htmlFor={inputId}
            >
                {label}
            </label>
            <input
                name={name}
                type={type}
                id={inputId}
                className={inputClass}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                size={size}
            />
        </>
    )

};

export default Input;