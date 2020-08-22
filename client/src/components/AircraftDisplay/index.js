import React from 'react'
import './style.css'

const AircraftDisplay = ({ aircraft }) => {

    return (
        <div className='tableBody'>
            {
                !!aircraft.length &&
                aircraft.map((x, i) =>
                    <div key={i + '-row'} id={x.id} className='tableCol'>
                        <div className='aircraft' id={x.id}>{x.tailNumber} {x.description}</div>
                    </div>)
            }
        </div>
    )

}
export default AircraftDisplay