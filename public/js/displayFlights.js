// function for getting all flights associated with the logged in user
async function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        // .then(async flights => await displayFlightTimeTable(flights))
        .then(async flights => await displayFlights_FLEX(flights))
        .catch(err => console.error(err));
};

function displayFlights_FLEX(raw_flights) {
    let $editButton;
    let $deleteButton;
    let tippyDiv;
    // console.log(raw_flights);
    const TABLE = $("#flextest");

    // map raw_flights data into flights object for column headers and appropriate order
    const flights = raw_flights.map(f => ({
        Date: moment(f.date).format("MM/DD/YY"),
        Aircraft: f['Aircraft.aircraftType'],
        'Tail Number': f.tailNumber,
        'Departure Airport': f.depAir,
        'Enroute Airport(s)': f.enrRout,
        'Arrival Airport': f.arrAir,
        'Flight Number': f.flightNum,
        // 'Departure Time': moment(f.depTime).format("hh:mm A"),
        // 'Arrival Time': moment(f.arrTime).format("hh:mm A"),
        Landings: f.landings,
        'IMC': f.imc,
        Hood: f.hood,
        IAP: f.iap,
        Holds: f.holds,
        PIC: f.pic,
        SIC: f.sic,
        CFI: f.cfi,
        Dual: f.dualI,
        'X-C': f.cxt,
        Solo: f.solo,
        Total: f.total,
        'Day Landings': f.dayLdg,
        Night: f.night,
        'Night Landing': f.nightLdg,
        Instructor: f.instructor,
        Student: f.student
    }));

    // column headers
    const header = $("<div>").addClass('table-row table-header');
    const stickyHeader = $("<div>").addClass('table-row table-header').attr('id', 'sticky').hide();
    // const index = $("<div>").addClass("col").text("#");
    // header.append(index);
    // extract keys from flights as header names
    const headers = Object.keys(flights[0]);
    for (var i = 0; i < headers.length; i++) {
        // create column, add text for our table headers
        const key = $("<div>").addClass("table-col").text(headers[i]);
        const stickyKeys = $("<div>").addClass('table-col').text(headers[i]);
        stickyHeader.append(stickyKeys);
        header.append(key);
    };
    TABLE.append(header, stickyHeader);

    for (let i = 0; i < flights.length; i++) {
        const row = $("<div>").addClass('table-row');
        row.data("flight", raw_flights[i].id);
        // row.click(clickFlightRow);

        // const index = $("<div>").addClass("col").text(i + 1);
        // row.append(index);

        const keys = Object.keys(flights[0]);
        for (let j = 0; j < keys.length; j++) {

            let col = $("<div>").addClass("table-col");
            const value = flights[i][keys[j]];
            if (value == 0) {
                col = $("<div>").addClass('table-col').text('...')
            } else {
                col = $("<div>").addClass('table-col').text(value); //flights[i] {id:4, date:...}
            };
            row.append(col);
        };
        TABLE.append(row);

        // const hiddenRow = $("<div>").addClass('row hidden-row').css("display", "none").data("flight", raw_flights[i].id);
        // const comments = $("<div>").addClass('col').text("Comments:");
        // const _comments = $("<div>").addClass('col').text(raw_flights[i].comments);

        // hiddenRow.append(comments, _comments);
        // TABLE.append(hiddenRow);

        // edit and delte buttons
        // let $button = $("<button>")
        //     .text("Edit")
        //     .attr('data-ft-id', raw_flights[i].id)
        //     .addClass('editButton');
        // const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-flight'>")
        //     .attr('data-ft-id', raw_flights[i].id)
        // row.append($button, $delBtn);
        let $img = $('<img>').attr('src','../assets/MenuChevron.png')
            .attr('data-ft-id', raw_flights[i].id)
            .addClass('tippy')
        row.append($img)
        TABLE.append(row);
    };

    
    $('.tippy').mouseover(function (event){
        flightId = $(this).attr('data-ft-id')
    });

    tippy('.tippy', {
        content: '<button id ="editFlight">Edit Flight</button><br><button id ="deleteFlight">Delete Flight</button>',
        interactive: true,
        allowHTML: true,
        placement: 'left',
        // duration:[0,15000],
            onShown: () => {
                document.getElementById('deleteFlight').addEventListener('click',function (event) {
                    event.preventDefault();
                    windowScroll =  window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
                    deleteFlights(flightId)
                });
                document.getElementById('editFlight').addEventListener('click',function (event) {
                    event.preventDefault();
                    flightEditId = $(this).attr('data-ft-id')
                    $accordian.empty();
                    // $('#create').collapse('toggle')
                    createFlight()
                    editFlightsAPICall(flightId)
                    window.scrollTo(0,0)
            
                });
            }
      }); 
      

    // delete button event listener
    // $('#deleteFlight').click(function (event) {
    //     const flightDeleteId = $(this).attr('data-ft-id')
    //     windowScroll =  window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    //     deleteFlights(flightDeleteId)
    // })


    // // edit button event listener
    // $('#editFlight').click(function (event) {
    //     event.preventDefault();
    //     flightEditId = $(this).attr('data-ft-id')
    //     $accordian.empty();
    //     // $('#create').collapse('toggle')
    //     createFlight()
    //     editFlightsAPICall(flightEditId)
    //     window.scrollTo(0,0)

    // })
    window.scrollTo(0,windowScroll)
    windowScroll=0
};

// function clickFlightRow() {
//     const id = $(this).data("flight");
//     $(".hidden-row").each(function (i, element) {
//         if (id === $(element).data("flight")) {
//             // $(this).show();
//             $(this).toggle();
//         }
//         //  else {
//         //     $(this).hide();
//         // };
//     });
// };