import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

const TotalsDisplay = () => {

    const [state, setState] = useState([]);

    useEffect(() => {
        API.getFlightTotals()
            .then(({ data }) => {
                const mapped = data.map(x => ({
                    'Cross Country': x.cxt,
                    Night: x.night,
                    'IMC': x.imc,
                    'Simulated Instrument': x.hood,
                    'Instrument Approaches': x.iap,
                    Holds: x.holds,
                    'Day Landings': x.dayLdg,
                    'Night Landing': x.nightLdg,
                    Solo: x.solo,
                    Dual: x.dualI,
                    PIC: x.pic,
                    SIC: x.sic,
                    CFI: x.cfi,
                    Total: x.total,
                }))
                setState({
                    results: mapped
                })
            })
            .then(console.log('state[0]', state.results))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            {console.log(state)}
            {/* {
                Object.keys(state[0]).map((x,i) => {
                   return <h4>{x}</h4>
                })
            } */}
        </div>
    )
}

export default TotalsDisplay;