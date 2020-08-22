import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';

const Chart = ({ totals }) => {

    const filteredTotals = {
        'xCountry': totals.cxt,
        pic: totals.pic,
        sic: totals.sic,
        cfi: totals.cfi,
        dualI: totals.dualI,
        solo: totals.solo,
        total: totals.total,
        night: totals.night
    }

    const pieTotals = {
        PIC: totals.pic,
        SIC: totals.sic,
        CFI: totals.cfi,
        'Dual I': totals.dualI
    }

    const barData = {
        labels: Object.keys(filteredTotals),
        datasets: [
            {
                label: 'Hours',
                backgroundColor: 'rgba(255,255,255,.8)',
                borderColor: 'rgba(0,26,200,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(filteredTotals)
            }
        ]
    };

    const pieData = {
        labels: Object.keys(pieTotals),
        datasets: [{
            data: Object.values(pieTotals),
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };
    

    return (
        <div>
            <h2>Totals</h2>
            <Bar
                data={barData}
                options={{
                    maintainAspectRatio: false
                }}
            />
            <h2>Pilot Times</h2>
            <Pie data={pieData} />
        </div>
    );
};

export default Chart;