import React, {useState} from 'react';
import Button from '../components/Button/index';

const Signup = () => {




    const handleClick = e => {
        e.preventDefault();
        console.log("clicked")
    }


    return (
        <main>

            <Button 
            text="Sign Up"
            btnId='signUp'
            handleClick={handleClick}/>
        </main>
    )
}

export default Signup;