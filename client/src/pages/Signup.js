import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Input from '../components/Input/index';
import API from '../utils/API';
import './signup.css'

const Signup = props => {

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
    }, [])


    const handleSignup = e => {
        e.preventDefault();
        
        API.userSignUp({
            email: state.email, 
            password: state.password
        })
        .then(res => props.history.push('/logbook'))
        .catch(err => {
            setState(state=>({
                ...state,
                error: err
            }))
        })
    };

    const handleLogin = e => {
        e.preventDefault();
        
        API.userLogin({
            email: state.email, 
            password: state.password
        })
        .then(res =>{
            console.log(res);
            props.history.push('/logbook');
        })
        .catch(err => {
            setState(state=>({
                ...state,
                error: err
            }))
        })
    };

    // takes form data and updates state with appropriate values
    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
    };


    return (
        <main className='signupWrapper'>
            <form className='signupForm'>
                <div className='formDiv1'>
                    <Input
                        label='email'
                        labelFor='email'
                        type='text'
                        inputId='email'
                        placeholder='email'
                        handleInputChange={handleInputChange}
                        name='email'
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
                        handleClick={handleSignup}
                    />
                    <Button
                        text="Log in"
                        btnId='logIn'
                        btnClass='authBtn'
                        handleClick={handleLogin}
                    />
                </div>

            </form>
            {
                state.error && <h1>{state.error.message}</h1>
            }
        </main>
    );
};

export default Signup;