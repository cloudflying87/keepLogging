import React from 'react';
import './style.css'

const TotalsDisplay = ({totals}) => {

    return (
        <div className='totalsList'>
            {
                <ul >
                    {!!totals.cxt &&
                        <li><strong>Cross Country</strong> {totals.cxt}</li>}
                    {!!totals.night &&
                        <li><strong>Night</strong> {totals.night}</li>}
                    {!!totals.imc &&
                        <li><strong>IMC</strong> {totals.imc}</li>}
                    {!!totals.hood &&
                        <li><strong>Simulated Instrument</strong> {totals.hood}</li>}
                    {!!totals.iap &&
                        <li><strong>Instrument Approaches</strong> {totals.iap}</li>}
                    {!!totals.holds &&
                        <li><strong>Holds</strong> {totals.holds}</li>}
                    {!!totals.dayLdg &&
                        <li><strong>Day Landings</strong> {totals.dayLdg}</li>}
                    {!!totals.nightLdg &&
                        <li><strong>Night Landings</strong> {totals.nightLdg}</li>}
                    {!!totals.solo &&
                        <li><strong>Solo</strong> {totals.solo}</li>}
                    {!!totals.dualI &&
                        <li><strong>Instruction Received</strong> {totals.dualI}</li>}
                    {!!totals.pic &&
                        <li><strong>PIC</strong> {totals.pic}</li>}
                    {!!totals.sic &&
                        <li><strong>SIC</strong> {totals.sic}</li>}
                    {!!totals.cfi &&
                        <li><strong>CFI</strong> {totals.cfi}</li>}
                    {!!totals.total &&
                        <li><strong>Total</strong> {totals.total}</li>}
                </ul>
            }
        </div>
    )
}

export default TotalsDisplay;