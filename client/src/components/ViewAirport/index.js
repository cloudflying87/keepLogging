import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'



const ViewAirport = ({ handleClick, handleFormInput }) => {

    return (
        <div>
            
                <div className='inputDiv'>
                    <Input
                        labelFor='airport'
                        label='airport'
                        name='airport'
                        type='airport'
                        inputId='airport'
                        inputClass='addFlightInput'
                        placeholder='Enter ICAO Identifier'
                        handleInputChange={handleFormInput}
                        onChange={handleFormInput}
                        // value={value.tailNumber}
                    />
                    <Button
                        text='Find Airport'
                        btnId='viewAirport'
                        className='formBtn'
                        handleClick={handleClick}
                    />
                </div>
                
                
                
            
        </div>
    )
}

export default ViewAirport;

