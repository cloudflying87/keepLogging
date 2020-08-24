$("#create-flight").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();
    // 3 cases
    // not active, not clicked => click it
    // not active, has been clicked => click it
    // make active and show
    // active, has been clicked =>  click it
    // close and hide

    if (!toggle.value && toggle.tab !== "CREATE_FLIGHT" || toggle.value && toggle.tab !== "CREATE_FLIGHT") {
        createFlight();
        $accordian.show();
        toggle.tab = "CREATE_FLIGHT";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CREATE_FLIGHT") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

$("#show-totals").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();

    if (!toggle.value && toggle.tab !== "CALL_TOTALS" || toggle.value && toggle.tab !== "CALL_TOTALS") {
        callTotals();
        $accordian.show();
        toggle.tab = "CALL_TOTALS";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CALL_TOTALS") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

$('#create-aircraft').on('click', function (e) {
    e.preventDefault();
    $accordian.empty();

    if (!toggle.value && toggle.tab !== "CREATE_AIRCRAFT" || toggle.value && toggle.tab !== "CREATE_AIRCRAFT") {
        createAircraft();
        $accordian.show();
        toggle.tab = "CREATE_AIRCRAFT";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "CREATE_AIRCRAFT") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});

$('#FlightTimeWorking').on('click', function (e) {
    e.preventDefault();
    $accordian.empty();

    if (!toggle.value && toggle.tab !== "createFlightWorking" || toggle.value && toggle.tab !== "createFlightWorking") {
        createFlightWorking();
        $accordian.show();
        toggle.tab = "createFlightWorking";
        toggle.value = true;

    } else if (toggle.value && toggle.tab === "createFlightWorking") {
        $accordian.empty();
        $accordian.hide();
        toggle.tab = "";
        toggle.value = false;
    };
});