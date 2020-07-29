// onload, make an api call to /api/user_data that will return a json object with their email and id. store this as a global object. then call getFlights()
$(window).on('load',async function () {
    await $.ajax({
        method: "GET",
        url: "/api/user_data"
    })
        .then(result => {
            userData = result;
            getAircraftTypes ();
            // console.log(userData)
        })
        .catch(err => console.error(err));

    getFlights(userData.id);
});

$("#logout").on('click', function (event) {
    event.preventDefault();
    $.ajax({method: "GET", url: "/logout"})
    .then(location.reload())
    .catch(error => console.error(error))
})