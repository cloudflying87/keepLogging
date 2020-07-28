async function editFlightsAPICall(flightId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userData.id}/${flightId}`
    })
        .then(flight => insertFlightTimetoEdit(flight))
        .catch(err => console.error(err));
};


// Manually putting in each of the flight time values into the input boxes.
function insertFlightTimetoEdit(flight) {
    // console.log(flight)
    // $('.form-control').each(function(){
    //     console.log($(this).attr('id'))
    // })
    $("#date").val(flight[0].date);
    $("#tailNumber").val(flight[0].tailNumber);
    aircraftDropDown.set(flight[0].Aircraft.aircraftType)
    $("#aircraftID").val('TEst');
    $("#depAir").val(flight[0].depAir);
    $("#enrRout").val(flight[0].enrRout);
    $("#arrAir").val(flight[0].arrAir);
    $("#comments").val(flight[0].comments);
    $("#instructor").val(flight[0].instructor);
    $("#student").val(flight[0].student);
    $("#iap").val(flight[0].iap);
    $("#holds").val(flight[0].holds);
    $("#landings").val(flight[0].landings)
    $("#dayLdg").val(flight[0].dayLdg)
    $("#nightLdg").val(flight[0].nightLdg)
    $("#total").val(flight[0].total)
    $("#cxt").val(flight[0].cxt)
    $("#night").val(flight[0].night)
    $("#hood").val(flight[0].hood)
    $("#imc").val(flight[0].imc)
    $("#dualI").val(flight[0].dualI)
    $("#cfi").val(flight[0].cfi)
    $("#pic").val(flight[0].pic)
    $("#sic").val(flight[0].sic)
    $("#solo").val(flight[0].solo)

    $('#createFlightButton').text('Edit Flight')
};