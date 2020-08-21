import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'
import moment from 'moment'


const AddFlightForm = ({ handleFormInput, handleAddFlight, handleClick, value }) => {
    console.log('addForm value:',value)
    const dateSet = () => {
        const dateWorking = new Date()
        let dateCur = (dateWorking.getFullYear()+'-'+(dateWorking.getMonth()+1) +'-'+dateWorking.getDate())
        return dateCur
        
    }
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
                        // value={moment()}
                    />
                    <Input
                        labelFor='aircraftType'
                        label='Aircraft Type'
                        name='aircraftType'
                        type='text'
                        inputId='aircraftTypeInput'
                        inputClass='addFlightInput'
                        placeholder='Aircraft Type'
                        handleInputChange={handleFormInput}
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
                    />
                </div>
                <div className='inputDiv gfi3'>
                    <Input
                        labelFor='flightNumber'
                        label='Flight Number'
                        name='flightNumber'
                        type='text'
                        inputId='flightNumberInput'
                        inputClass='addFlightInput'
                        placeholder='Flight Num'
                        handleInputChange={handleFormInput}
                        size={6}
                    />
                    <Input
                        labelFor='departureTime'
                        label='Dep Time'
                        name='departureTime'
                        type='text'
                        inputId='departureTimeInput'
                        inputClass='addFlightInput'
                        placeholder='Dep Time'
                        handleInputChange={handleFormInput}
                        size={6}
                    />
                    <Input
                        labelFor='arrivalTime'
                        label='Arr Time'
                        name='arrivalTime'
                        type='text'
                        inputId='arrivalTimeInput'
                        inputClass='addFlightInput'
                        placeholder='Arr Time'
                        handleInputChange={handleFormInput}
                        size={6}

                    />
                    <Button
                        text='Auto Fill'
                        btnId='autoFill'
                        className='formBtn'
                        handleClick={handleClick}
                    />
                </div>
                <h4 className='header'>Approaches and Landings</h4>
                <div className='appLandDiv'>
                    <Input
                        labelFor='approach'
                        label='Approach'
                        name='approach'
                        type='text'
                        inputId='approachInput'
                        inputClass='addFlightInput'
                        placeholder='Approach'
                        handleInputChange={handleFormInput}
                        size={4}
                    />
                    <Input
                        labelFor='hold'
                        label='hold'
                        name='hold'
                        type='text'
                        inputId='holdInput'
                        inputClass='addFlightInput'
                        placeholder='Hold'
                        handleInputChange={handleFormInput}
                        size={4}
                    />
                    <Input
                        labelFor='landings'
                        label='landings'
                        name='landings'
                        type='text'
                        inputId='landingsInput'
                        inputClass='addFlightInput'
                        placeholder='Landings'
                        handleInputChange={handleFormInput}
                        size={4}
                    />
                    <Input
                        labelFor='dayLandings'
                        label='dayLandings'
                        name='dayLandings'
                        type='text'
                        inputId='dayLandingsInput'
                        inputClass='addFlightInput'
                        placeholder='Day Landings'
                        handleInputChange={handleFormInput}
                        size={4}
                    />
                    <Input
                        labelFor='nightLandings'
                        label='nightLandings'
                        name='nightLandings'
                        type='text'
                        inputId='nightLandingsInput'
                        inputClass='addFlightInput'
                        placeholder='night Landings'
                        handleInputChange={handleFormInput}
                        size={4}
                    />
                </div>
                <h4 className='header'>Times</h4>
                <div>
                    <div className='timesDivRow1'>
                        <Input
                            labelFor='total'
                            label='total'
                            name='total'
                            type='text'
                            inputId='totalInput'
                            inputClass='addFlightInput'
                            placeholder='Total'
                            handleInputChange={handleFormInput}
                            size={4}
                            value={value.total}
                        />
                        <Input
                            labelFor='crossCountry'
                            label='crossCountry'
                            name='crossCountry'
                            type='text'
                            inputId='crossCountryInput'
                            inputClass='addFlightInput'
                            placeholder='Cross Country'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='night'
                            label='night'
                            name='night'
                            type='text'
                            inputId='nightInput'
                            inputClass='addFlightInput'
                            placeholder='Night'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='imc'
                            label='imc'
                            name='imc'
                            type='text'
                            inputId='imcInput'
                            inputClass='addFlightInput'
                            placeholder='IMC'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='hood'
                            label='hood'
                            name='hood'
                            type='text'
                            inputId='hoodInput'
                            inputClass='addFlightInput'
                            placeholder='Hood'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                    </div>
                    <div className='timesDivRow2'>
                        <Input
                            labelFor='pic'
                            label='pic'
                            name='pic'
                            type='text'
                            inputId='picInput'
                            inputClass='addFlightInput'
                            placeholder='PIC'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='sic'
                            label='sic'
                            name='sic'
                            type='text'
                            inputId='sicInput'
                            inputClass='addFlightInput'
                            placeholder='SIC'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='cfi'
                            label='cfi'
                            name='cfi'
                            type='text'
                            inputId='cfiInput'
                            inputClass='addFlightInput'
                            placeholder='CFI'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='dual'
                            label='dual'
                            name='dual'
                            type='text'
                            inputId='dualInput'
                            inputClass='addFlightInput'
                            placeholder='Dual'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                        <Input
                            labelFor='solo'
                            label='solo'
                            name='solo'
                            type='text'
                            inputId='soloInput'
                            inputClass='addFlightInput'
                            placeholder='Solo'
                            handleInputChange={handleFormInput}
                            size={4}
                        />
                    </div>

                </div>
                <div className='btnWrapper'>
                    <Button
                        text='Add Flight'
                        btnId='createFlightBtn'
                        className='formBtn'
                        handleClick={handleAddFlight}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddFlightForm;