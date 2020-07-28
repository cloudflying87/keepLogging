// function for input boxes for create aircraft section
function createAircraft() {

    const generalAircraft = ['', 'aircraftType', 'class', 'numEngine'];
    const generalAircraftLabels = ['General Aircraft Information', 'general', 'Aircraft Type', 'Class (Land or Sea)', 'Number of Engines'];
    createInputLoop(generalAircraft, generalAircraftLabels);

    const generalAircraftBoolean = ['', 'tailWheel', 'complex', 'highPerf', 'turboFan', 'turboProp', 'rotorcraft', 'poweredLift'];
    const generalAircraftBooleanLabels = ['', 'general', 'Tail Wheel', 'Complex', 'High Perf', 'Turbo Fan', 'Turbo Prop', 'Rotorcraft', 'Powered Lift'];
    createInputLoopCheckboxes(generalAircraftBoolean, generalAircraftBooleanLabels);

    const newButton = $("<button>").attr('id', 'create-aircraft-button').text("Add Aircraft")
    $accordian.append(newButton)

    // changes value of checkbox to 1 if it is checked
    const checkbox = $(this);
    $('.aircraft-chkbx').change(function () {
        if (checkbox.prop('checked', 'true')) {
            checkbox.val(1);
        };
    });

    $('#create-aircraft-button').on('click', function (e) {
        e.preventDefault();
        writeAircraft();
        aircraftDropDownValues = [];
        getAircraftTypes();
    })
};

// function for writing create aircraft fields to the db
function writeAircraft() {
    $('.form-control').each(function () {
        // console.log($(this).attr('class'))
        if ($(this).hasClass('general')) {
            const generalName = $(this).attr('id')
        } else {
            Error();
        };
    });

    $.post("/api/aircraft", {
        userId: userData.id,
        aircraftType: $("#aircraftType").val(),
        class: $("#class").val(),
        numEngine: $("#numEngine").val(),
        tailWheel: $("#tailWheel").val(),
        complex: $("#complex").val(),
        highPerf: $("#highPerf").val(),
        turboFan: $("#turboFan").val(),
        turboProp: $("#turboProp").val(),
        rotorcraft: $("#rotorcraft").val(),
        poweredLift: $("#poweredLift").val()
    })
    .then(result => {
        // console.log(result)
        $('#dyn-form').empty()
        createAircraft();
    })
    .catch(err => console.error(err.responseJSON.parent));

};