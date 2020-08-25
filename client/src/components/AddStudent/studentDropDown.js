import React from 'react';
import Button from '../Button/index';
import './style.css'
import Select from 'react-select'


const SelectStudent = ({ addT, setAircraft, value, handleFormInput }) => {

    return (
        <div>
            <form>
                <div className='inputDiv'>
                    <Select
                        // options={value.ids}
                        labelFor='selectStudent'
                        label='Students'
                        name='selectStudent'
                        inputId='selectStudentInput'
                        inputClass='addStudent dropdown'
                        onChange={setAircraft}
                    />
                </div>
                <div className='btnWrapper'>
                    <Button
                        text='Select Student'
                        btnId='selectStudent'
                        className='formBtn'
                        handleClick={addT}
                    />
                </div>
            </form>
        </div>
    )
}

export default SelectStudent;