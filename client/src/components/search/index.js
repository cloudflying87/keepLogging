import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'



const SearchDates = ({ handleClick, handleFormInput, value }) => {

    return (
        <div>
            
                <div className='searchDiv'>
                <h2>Enter date range for flights</h2>
                    <Input
                        labelFor='startDate'
                        label='startDate'
                        name='startDate'
                        type='date'
                        inputId='startDate'
                        inputClass='searchDates'
                        placeholder='Enter ICAO Identifier'
                        handleInputChange={handleFormInput}
                        onChange={handleFormInput}
                        value={value.startDate}
                    />
                    <Input
                        labelFor='endDate'
                        label='endDate'
                        name='endDate'
                        type='date'
                        inputId='endDate'
                        inputClass='searchDates'
                        placeholder='Enter ICAO Identifier'
                        handleInputChange={handleFormInput}
                        onChange={handleFormInput}
                        value={value.endDate}
                    />
                    <Button
                        text='Search'
                        btnId='search'
                        className='formBtn'
                        handleClick={handleClick}
                    />
                </div>
                
                
                
            
        </div>
    )
}

export default SearchDates;

