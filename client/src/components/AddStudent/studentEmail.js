import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'


const AddStudent = ({ addT, setAircraft, value, handleFormInput }) => {

    return (
        <div>
            <form>
                <div className='inputDiv'>
                    <Input
                        labelFor='studentEmail'
                        label='studentEmail'
                        name='studentEmail'
                        type='studentEmail'
                        inputId='studentEmail'
                        inputClass='addFlightInput'
                        placeholder='Add Student Email'
                        handleInputChange={handleFormInput}
                        value={value.studentsEmail}
                    />
                </div>
                <div className='btnWrapper'>
                    <Button
                        text='Add Student'
                        btnId='addStudent'
                        className='formBtn'
                        handleClick={addT}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddStudent;