import React from 'react'
import './style.css'

const AircraftDisplay = ({ aircraft }) => {

    return (
        <div className='tableBody'>
            {
                !!aircraft.length &&
                aircraft.map((x, i) => <div key={i + '-row'} id={x.id} className='tableCol'>
                    <div className='aircraft' id={x}>{x}</div>

                </div>)
            }
        </div>
    )

}
export default AircraftDisplay