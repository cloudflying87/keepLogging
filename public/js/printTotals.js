function callTotals() {
    $.ajax({
        method: "GET",
        url: `/api/flight_times/totals/${userData.id}`
    })
        .then(results => {
            printTotals(results)
        })
        .catch(err => console.error(err));
};

function printTotals(raw_totals) {
    const TABLE = $("#dyn-form");
    const totals = raw_totals.map(f => ({
        'Cross Country': f.cxt,
        Night: f.night,
        'IMC': f.imc,
        'Simulated Instrument': f.hood,
        'Instrument Approaches': f.iap,
        Holds: f.holds,
        'Day Landings': f.dayLdg,
        'Night Landing': f.nightLdg,
        Solo: f.solo,
        Dual: f.dualI,
        PIC: f.pic,
        SIC: f.sic,
        CFI: f.cfi,
        Total: f.total,
    }));

    const totalRow1 = $("<div>").addClass('row');
    const totalRow2 = $("<div>").addClass('row');
    const headers = Object.keys(totals[0]);
    const values = Object.values(totals[0])
    for (var i = 0; i < headers.length; i++) {
        const divCont = $("<div>").addClass('totalList')
        const key = $('<li>').addClass('totalList').text(headers[i])
        const valueRow = $('<li>').addClass('totalList').text(values[i])
        divCont.append(key, valueRow)
        if (i < 8) {
            // key.append(valueRow)
            // totalRow1.append(key,valueRow)
            totalRow1.append(divCont)
        } else {
            // key.append(valueRow)
            // totalRow2.append(key)
            totalRow2.append(divCont)
        }
        ;
    };
    TABLE.append(totalRow1, totalRow2);
};