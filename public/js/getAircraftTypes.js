function getAircraftTypes () {
    $.ajax({
        method: "GET",
        url: `/api/aircraftTypes`
    })
        .then(air => air.map(a => {
            aircraftDropDownValues.push(a)
        }))
        .catch(err => console.error(err));
};