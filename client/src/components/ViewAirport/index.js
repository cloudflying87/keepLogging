import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'
import Select from 'react-select'


const ViewAirport = ({ handleClick, handleFormInput }) => {

    return (
        <div>
            <form>
                <h4 className='header'>Aircraft Information</h4>
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
                        // value={value.tailNumber}
                    />
                    <Button
                        text='Find Airport'
                        btnId='viewAirport'
                        className='formBtn'
                        handleClick={handleClick}
                    />
                </div>
                
                
                
            </form>
        </div>
    )
}

export default ViewAirport;

