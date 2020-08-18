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

    const handleInputChange = ({ target: { value, name }}) => {
        setState(state=>({
            ...state,
            [name]: value
        }))
        console.log(state)
    };

    const switchFunc = arg => {
        switch (arg) {
            case 'addFlightBtn':
                return (
                <form>
                    {/* <Input 
                    labelFor='date'
                    label='Date'
                    name='date'
                    type='date'
                    id='dateInput'
                    placeholder='date'
                    handleInputChange={handleInputChange}
                    />
                    <Input 
                    labelFor='aircraftType'
                    label='Aircraft Type'
                    name='aircraftType'
                    type='text'
                    id='aircraftTypeInput'
                    placeholder='Aircraft Type'
                    handleInputChange={handleInputChange}

                    /> */}
                </form>
                )
                break;
            default:
                return null;
                break;
        }
    }

    return (
        <div>
            {console.log(state)}
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