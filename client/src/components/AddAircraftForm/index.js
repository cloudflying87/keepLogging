import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'



const AddAircraft = ({ handleFormInput, handleAddFlight, handleClick, value }) => {
    
    return (
        <div>
            <form>
                <h4 className='header'>General Flight Info</h4>
                <div className='inputDiv'>
                    
                </div>
                <div className='btnWrapper'>
                    <Button
                        text='Add Airplane'
                        btnId='createFlightBtn'
                        className='formBtn'
                        handleClick={handleAddFlight}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAircraft;