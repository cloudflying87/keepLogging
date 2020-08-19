import React from 'react';
import Button from '../Button/index';
import './style.css'

const Modal = ({ handleClick, results }) => {

    console.log(results)

    return (
        <div className='modal'>
            <div className='modalContent'>
                <Button
                    className='modalBtn'
                    btnId='closeModal'
                    text='X'
                    handleClick={handleClick}
                />
                <ul>

                    <li><strong>Date:</strong> {results.date}</li>
                    {!!results['Aircraft.aircraftType'] &&
                        <li><strong>Aircraft:</strong> {results['Aircraft.aircraftType']}</li>}
                    <li><strong>Tail Number:</strong> {results.tailNumber}</li>
                    <li><strong>Departure Airport:</strong> {results.depAir}</li>
                    {!!results.enRout && <li><strong>Enroute:</strong> {results.enrRout}</li>}
                    <li><strong>Arrival Airport:</strong> {results.arrAir}</li>
                    {!!results.flightNumber && <li><strong>Flight Number</strong> {results.flightNum}</li>}
                    {!!results.landings && <li><strong>Landings:</strong> {results.landings}</li>}
                    {!!results.imc && <li><strong>IMC:</strong> {results.imc}</li>}
                    {!!results.hood && <li><strong>Hood:</strong> {results.hood}</li>}
                    {!!results.iap && <li><strong>IAP:</strong> {results.iap}</li>}
                    {!!results.holds && <li><strong>Holds:</strong> {results.holds}</li>}
                    {!!results.pic && <li><strong>PIC:</strong> {results.pic}</li>}
                    {!!results.sic && <li><strong>SIC:</strong> {results.sic}</li>}
                    {!!results.cfi && <li><strong>CFI:</strong> {results.cfi}</li>}
                    {!!results.dualI && <li><strong>Dual:</strong> {results.cfi}</li>}
                    {!!results.cxt && <li><strong>Cross Country:</strong> {results.cxt}</li>}
                    {!!results.solo && <li><strong>Solo:</strong> {results.solo}</li>}
                    {!!results.total && <li><strong>Total:</strong> {results.total}</li>}
                    {!!results.dayLdg && <li><strong>Day Landings:</strong> {results.dayLdg}</li>}
                    {!!results.night && <li><strong>Night:</strong> {results.night}</li>}
                    {!!results.nightLdg && <li><strong>Night Landings:</strong> {results.nightLdg}</li>}
                    {!!results.instructor && <li><strong>Instructor:</strong> {results.instructor}</li>}
                    {!!results.student && <li><strong>Student:</strong> {results.student}</li>}


                </ul>
            </div>
        </div>
    )
}

export default Modal;