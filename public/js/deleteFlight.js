// To delete flights function
async function deleteFlights(deleteId) {
    $("#flextest").empty();
    $.ajax({
        method: "DELETE",
        url: `/api/flight_time/delete/${userData.id}/${deleteId}`
    })
        .then(await getFlights(userData.id))
        .catch(err => console.error(err));
};