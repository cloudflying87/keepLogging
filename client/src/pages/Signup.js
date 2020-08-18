import React, { useState } from 'react';
import Button from '../components/Button/index';
import Input from '../components/Input/index';

const Signup = () => {

    const [state, setState] = useState({
        username: '',
        password: ''
    })


    const handleClick = e => {
        e.preventDefault();
        console.log("clicked " + e.target.id)
    };

    // takes form data and updates state with appropriate values
    const handleInputChange = ({ target: { value, name }}) => {
        setState(state=>({
            ...state,
            [name]: value
        }))
    };


    return (
        <main>
            <form>
                <Input
                label='username'
                labelFor='username'
                type='text'
                inputId='username'
                placeholder='Username' 
                handleInputChange={handleInputChange}
                name='username'
                />
                <Input
                label='password'
                labelFor='password'
                type='password'
                inputId='password'
                placeholder='Password'
                handleInputChange={handleInputChange}
                name='password'
                 />
                <Button
                    text="Sign up"
                    btnId='signUp'
                    handleClick={handleClick}
                />
                <Button
                    text="Log in"
                    btnId='logIn'
                    handleClick={handleClick}
                />
                
            </form>
        </main>
    );
};

export default Signup;