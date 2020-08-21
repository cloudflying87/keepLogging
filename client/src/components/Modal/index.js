import React from 'react';
import Button from '../Button/index';
import API from '../../utils/API';
import './style.css'

const Modal = ({ handleClick, results }) => {
    console.log('modal results', results)

    const deleteFlight = e => {
        e.preventDefault();
        // hit the delete flight route
        API.deleteFlight(results.id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            // closes modal after flight is deleted
            handleClick(e)
    }

    const editFlight = e => {
        e.preventDefault();
        // API.updateFlight(results.id)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    return (
        <div className='modal'>
            <div className='modalContent'>
                <Button
                    btnClass='modalBtn'
                    btnId='closeModal'
                    text='X'
                    handleClick={handleClick}
                />

                <ul className='modalUl'>

                    <li className='modalLi'><strong>Date:</strong> {results.date}</li>

                    {!!results['Aircraft.tailNumber'] &&
                        <li className='modalLi'><strong>Aircraft:</strong> {results['Aircraft.tailNumber']}</li>}

                    <li className='modalLi'><strong>Tail Number:</strong> {results.tailNumber}</li>

                    {!!results.route && <li className='modalLi'><strong>Route:</strong> {results.route}</li>}

                    {!!results.flightNumber && <li className='modalLi'><strong>Flight Number</strong> {results.flightNum}</li>}

                    {!!results.landings && <li className='modalLi'><strong>Landings:</strong> {results.landings}</li>}

                    {!!results.imc && <li className='modalLi'><strong>IMC:</strong> {results.imc}</li>}

                    {!!results.hood && <li className='modalLi'><strong>Hood:</strong> {results.hood}</li>}

                    {!!results.iap && <li className='modalLi'><strong>IAP:</strong> {results.iap}</li>}

                    {!!results.holds && <li className='modalLi'><strong>Holds:</strong> {results.holds}</li>}

                    {!!results.pic && <li className='modalLi'><strong>PIC:</strong> {results.pic}</li>}

                    {!!results.sic && <li className='modalLi'><strong>SIC:</strong> {results.sic}</li>}

                    {!!results.cfi && <li className='modalLi'><strong>CFI:</strong> {results.cfi}</li>}

                    {!!results.dualI && <li className='modalLi'><strong>Dual:</strong> {results.cfi}</li>}

                    {!!results.cxt && <li className='modalLi'><strong>Cross Country:</strong> {results.cxt}</li>}

                    {!!results.solo && <li className='modalLi'><strong>Solo:</strong> {results.solo}</li>}

                    {!!results.total && <li className='modalLi'><strong>Total:</strong> {results.total}</li>}

                    {!!results.dayLdg && <li className='modalLi'><strong>Day Landings:</strong> {results.dayLdg}</li>}

                    {!!results.night && <li className='modalLi'><strong>Night:</strong> {results.night}</li>}

                    {!!results.nightLdg && <li className='modalLi'><strong>Night Landings:</strong> {results.nightLdg}</li>}

                    {!!results.instructor && <li className='modalLi'><strong>Instructor:</strong> {results.instructor}</li>}

                    {!!results.student && <li className='modalLi'><strong>Student:</strong> {results.student}</li>}


                </ul>
                <Button
                    text='Edit'
                    btnId='editBtn'
                    className='editAndDeleteBtns'
                    handleClick={editFlight}
                />
                <Button
                    text='Delete'
                    btnId='deleteBtn'
                    className='editAndDeleteBtns'
                    handleClick={deleteFlight}
                />
            </div>
        </div>
    )
}

export default Modal;