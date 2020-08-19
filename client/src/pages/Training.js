import React, { useState } from 'react';
import Button from '../components/Button/index';
import Input from '../components/Input/index';

const Training = () => {

    const [state, setState] = useState({
        emailAddress: '',
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
                label='emailAddress'
                labelFor='emailAddress'
                type='text'
                inputId='emailAddress'
                placeholder='emailAddress' 
                handleInputChange={handleInputChange}
                name='emailAddress'
                />
                
                <Button
                    text="Connect"
                    btnId='Connect'
                    handleClick={handleClick}
                />
                
            </form>
        </main>
    );
};

export default Training;