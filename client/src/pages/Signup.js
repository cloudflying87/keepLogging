import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Input from '../components/Input/index';
import API from '../utils/API';
import './signup.css'

const Signup = () => {

    const [state, setState] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {

    }, [])


    const handleClick = e => {
        e.preventDefault();
        console.log("clicked " + e.target.id)
        API.
    };

    // takes form data and updates state with appropriate values
    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
        console.log(state)
    };


    return (
        <main className='signupWrapper'>
            <form className='signupForm'>
                <div className='formDiv1'>
                    <Input
                        label='username'
                        labelFor='username'
                        type='text'
                        inputId='username'
                        placeholder='Username'
                        handleInputChange={handleInputChange}
                        name='username'
                        className='inputBox'
                        />
                    <Input
                        label='password'
                        labelFor='password'
                        type='password'
                        inputId='password'
                        placeholder='Password'
                        handleInputChange={handleInputChange}
                        name='password'
                        className='inputBox'
                    />
                </div>
                <div className='formDiv2'>
                    <Button
                        text="Sign up"
                        btnId='signUp'
                        btnClass='authBtn'
                        handleClick={handleClick}
                    />
                    <Button
                        text="Log in"
                        btnId='logIn'
                        btnClass='authBtn'
                        handleClick={handleClick}
                    />
                </div>

            </form>
        </main>
    );
};

export default Signup;