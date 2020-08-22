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
                    <Input
                        labelFor='date'
                        label='Date'
                        name='date'
                        type='date'
                        inputId='dateInput'
                        inputClass='addFlightInput'
                        placeholder='date'
                        handleInputChange={handleFormInput}
                        // value={logbookForm.date}
                        value={value.date}
                    />
                    {console.log('this',value.aircraftType)}
                    <Input
                        labelFor='aircraftType'
                        label='Aircraft Type'
                        name='aircraftType'
                        type='list'
                        inputId='aircraftTypeInput'
                        inputClass='addFlightInput'
                        placeholder='Aircraft Type'
                        handleInputChange={handleFormInput}
                        value={value.aircraftType}
                    />
                    <Input
                        labelFor='route'
                        label='Route'
                        name='route'
                        type='text'
                        inputId='routeInput'
                        inputClass='addFlightInput'
                        placeholder='Route'
                        handleInputChange={handleFormInput}
                        value={value.depAir, value.enrRout, value.arrAir}
                    />
                </div>
                <div className='commentsDiv'>
                    <textarea
                        label='Comments'
                        name='comments'
                        type='text-area'
                        id='commentsInput'
                        className='addFlightInput'
                        placeholder='comments'
                        onChange={handleFormInput}
                        rows={4}
                        cols={40}
                        value={value.comments}
                    />
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