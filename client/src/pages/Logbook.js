import React, { useState, useEffect } from 'react';
import Button from '../components/Button/index';
import Nav from '../components/Nav/index';
import Input from '../components/Input/index';
import './logbook.css'

const Logbook = () => {

    const [state, setState] = useState({
        open: false,
        btnClicked: '',
    })

    // useEffect(() => {

    // }, [state.btnClicked])

    const handleInputChange = ({ target: { value, name } }) => {
        setState(state => ({
            ...state,
            [name]: value
        }))
        console.log(state)
    };

    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
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
                                    handleInputChange={handleInputChange}
                                />
                                <Input
                                    labelFor='aircraftType'
                                    label='Aircraft Type'
                                    name='aircraftType'
                                    type='text'
                                    inputId='aircraftTypeInput'
                                    inputClass='addFlightInput'
                                    placeholder='Aircraft Type'
                                    handleInputChange={handleInputChange}
                                />
                                <Input
                                    labelFor='route'
                                    label='Route'
                                    name='route'
                                    type='text'
                                    inputId='routeInput'
                                    inputClass='addFlightInput'
                                    placeholder='Route'
                                    handleInputChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    rows={4}
                                    cols={65}
                                />
                            </div>
                            <div className='inputDiv'>
                                <Input
                                    labelFor='flightNumber'
                                    label='Flight Number'
                                    name='flightNumber'
                                    type='text'
                                    inputId='flightNumberInput'
                                    inputClass='addFlightInput'
                                    placeholder='Flight Num'
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
                                />
                                <Input
                                    labelFor='arrivalTime'
                                    label='Arr Time'
                                    name='arrivalTime'
                                    type='text'
                                    inputId='arrivalTimeInput'
                                    inputClass='addFlightInput'
                                    placeholder='Arr Time'
                                    handleInputChange={handleInputChange}
                                />
                                <Button
                                    text='Auto Fill'
                                    btnId='autoFill'
                                    className='formBtn'
                                    handleClick={(e) => {
                                        e.preventDefault();
                                        console.log('hello')
                                    }}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
                                    size={4}
                                />
                                <Input
                                    labelFor='crossCountry'
                                    label='crossCountry'
                                    name='crossCountry'
                                    type='text'
                                    inputId='crossCountryInput'
                                    inputClass='addFlightInput'
                                    placeholder='Cross Country'
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
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
                                    handleInputChange={handleInputChange}
                                    size={4}
                                />
                            </div>

                            </div>
                            <div className='btnWrapper'>
                                <Button
                                    text='Add Flight'
                                    btnId='createFlightBtn'
                                    className='formBtn'
                                    handleClick={(e) => {
                                        e.preventDefault();
                                        console.log('add flight clicked')
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                )
                break;
            default:
                return null;
                break;
        }
    }

    return (
        <div>
            <Nav />
            <div className='menuDiv'>
                {/* here will be the buttons for this page. Maybe i'll make a component for these since there will be one on each page. */}
                <Button
                    text='Add Flight'
                    btnId='addFlightBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState({
                            open: !state.open,
                            btnClicked: target.id
                        })
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Search'
                    btnId='searchBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState({
                            open: !state.open,
                            btnClicked: target.id
                        })
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Totals'
                    btnId='totalsBtn'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
                    }}
                />
                <Button
                    text='Training'
                    btnId='training'
                    btnClass='menuBtn'
                    handleClick={(e) => {
                        const { target } = e
                        e.preventDefault()
                        console.log("add flight")
                        setState(state => ({
                            ...state,
                            open: !state.open,
                            btnClicked: target.id
                        }))
                        console.log(state.btnClicked)
                    }}
                />
            </div>
            <div className='formDiv'>
                {
                    !state.open
                        ? null
                        : (
                            switchFunc(state.btnClicked)
                            // <form></form>
                        )
                }
            </div>
            <main>
                {/* Modal for popping out table. maybe a 'view' button opens and closes it */}
                {/* The table will live here. Might try to do an actual table first, then will try grid or flexbox. */}

            </main>

        </div>
    )
}

export default Logbook;