import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'
import Select from 'react-select'


const AddAircraft = ({ addT, setAircraft, value }) => {

    return (
        <div>
            <form>
                <h4 className='header'>Aircraft Information</h4>
                <div className='inputDiv'>
                    <Input
                        labelFor='tailNumber'
                        label='tailNumber'
                        name='tailNumber'
                        type='tailNumber'
                        inputId='tailNumber'
                        inputClass='addFlightInput'
                        placeholder='Tail Number'
                        // handleInputChange={handleFormInput}
                        // value={value.tailNumber}
                    />
                    <Select
                        options={value.allModels}
                        labelFor='aircraftType'
                        label='Aircraft Type'
                        name='aircraftType'
                        inputId='aircraftTypeInput'
                        inputClass='addFlightInput dropdown'
                        onChange={setAircraft}
                    />
                </div>
                <div className='btnWrapper'>
                    <Button
                        text='Add Airplane'
                        btnId='createAircraftBtn'
                        className='formBtn'
                        handleClick={addT}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAircraft;