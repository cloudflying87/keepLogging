import React from 'react';
import Input from '../Input/index';
import Button from '../Button/index';
import './style.css'
import Select from 'react-select'

const AddFlightForm = ({ handleFormInput, handleAddFlight, handleClick, value, setAircraft, text }) => {
    console.log('add flight from value: ', value)
    const customStyles ={
        option: (provided, state) =>({
            ...provided,
            color: state.isSelected && 'blue',
        }),
        control: (provided,state) => ({
            ...provided,
            width:'auto',
            height:'15px',
            color:'purple'
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 1300ms';
        
            return { ...provided, opacity, transition };
          }
    }
    return (
        <div>
            <form>
                <h4 className='header'>General Flight Info</h4>
                <div className='inputDiv threeboxes'>
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
                    {/* <Input
                        labelFor='aircraftType'
                        label='Aircraft Type'
                        name='aircraftType'
                        type='list'
                        inputId='aircraftTypeInput'
                        inputClass='addFlightInput'
                        placeholder='Aircraft Type'
                        handleInputChange={handleFormInput}
                        value={value.aircraftType}
                    /> */}
                    {/* <DropdownList
                        data={value.aircraftType}
                        valueField='id'
                        textField='name'
                        defaultValue={1}
                    /> */}
                    <Select 
                        options={value.aircraftList}
                        labelFor='aircraftType'
                        label='Aircraft Type'
                        name='aircraftType'
                        inputId='aircraftTypeInput'
                        inputClass='addFlightInput dropdown'
                        placeholder='Aircraft Type'
                        width='200px'
                        styles={customStyles}
                        onChange={setAircraft}
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
                <div className='inputDiv gfi3'>
                    <Input
                        labelFor='flightNum'
                        label='Flight Number'
                        name='flightNum'
                        type='text'
                        inputId='flightNumberInput'
                        inputClass='addFlightInput'
                        placeholder='Flight Num'
                        handleInputChange={handleFormInput}
                        size={6}
                        value={value.flightNum}
                    />
                    <Input
                        labelFor='depTime'
                        label='Dep Time'
                        name='depTime'
                        type='text'
                        inputId='departureTimeInput'
                        inputClass='addFlightInput'
                        placeholder='Dep Time'
                        handleInputChange={handleFormInput}
                        size={6}
                        value={value.depTime}
                    />
                    <Input
                        labelFor='arrTime'
                        label='Arr Time'
                        name='arrTime'
                        type='text'
                        inputId='arrivalTimeInput'
                        inputClass='addFlightInput'
                        placeholder='Arr Time'
                        handleInputChange={handleFormInput}
                        size={6}
                        value={value.arrTime}

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
                        labelFor='iap'
                        label='Approach'
                        name='iap'
                        type='text'
                        inputId='approachInput'
                        inputClass='addFlightInput'
                        placeholder='Approach'
                        handleInputChange={handleFormInput}
                        size={4}
                        value={value.iap}
                    />
                    <Input
                        labelFor='holds'
                        label='hold'
                        name='holds'
                        type='text'
                        inputId='holdInput'
                        inputClass='addFlightInput'
                        placeholder='Hold'
                        handleInputChange={handleFormInput}
                        size={2}
                        value={value.holds}

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
                        value={value.landings}

                    />
                    <Input
                        labelFor='dayLdg'
                        label='dayLandings'
                        name='dayLdg'
                        type='text'
                        inputId='dayLandingsInput'
                        inputClass='addFlightInput'
                        placeholder='Day Landings'
                        handleInputChange={handleFormInput}
                        size={4}
                        value={value.dayLdg}

                    />
                    <Input
                        labelFor='nightLdg'
                        label='nightLandings'
                        name='nightLdg'
                        type='text'
                        inputId='nightLandingsInput'
                        inputClass='addFlightInput'
                        placeholder='Night Landings'
                        handleInputChange={handleFormInput}
                        size={4}
                        value={value.nightLdg}

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
                            size={3}
                            value={value.total}
                        />
                        <Input
                            labelFor='cxt'
                            label='crossCountry'
                            name='cxt'
                            type='text'
                            inputId='crossCountryInput'
                            inputClass='addFlightInput'
                            placeholder='xCountry'
                            handleInputChange={handleFormInput}
                            size={3}
                            value={value.cxt}
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
                            size={3}
                            value={value.night}
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
                            size={3}
                            value={value.imc}

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
                            size={3}
                            value={value.hood}

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
                            size={3}
                            value={value.pic}

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
                            size={3}
                            value={value.sic}

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
                            size={3}
                            value={value.cfi}

                        />
                        <Input
                            labelFor='dualI'
                            label='dual'
                            name='dualI'
                            type='text'
                            inputId='dualInput'
                            inputClass='addFlightInput'
                            placeholder='Dual'
                            handleInputChange={handleFormInput}
                            size={3}
                            value={value.dualI}

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
                            size={3}
                            value={value.solo}

                        />
                    </div>

                </div>
                <div className='btnWrapper'>
                    <Button
                        text={text}
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