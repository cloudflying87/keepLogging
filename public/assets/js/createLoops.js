// functions for dynamically creating forms
function createInputLoop(arr1, arr2) {
    $generalFlightInfo = $('<div>').addClass('title').text(arr2[0]);
    $accordian.append($generalFlightInfo);
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] === 'aircraftID') {
            const $dropdown = $('<select>');
            $dropdown.attr('id', arr1[i]);
            const $label = $("<label>");
            const $newAir = $('<a href =#>');
            $newAir.attr('id', 'addAircraftShortcut');
            $newAir.text(' :Add Aircraft');
            $dropdown.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            $label.append($newAir);
            const $formDiv = $('<div>').addClass(`form-div-${arr1[i]}`);
            $formDiv.append($label, $dropdown);
            $accordian.append($formDiv);
        } else {
            const $input = $('<input class=form-control>');
            const $label = $("<label>");
            $input.attr('id', arr1[i]);
            $input.attr('placeholder', arr1[0]);
            $input.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            const $formDiv = $('<div>').addClass(`form-div-${arr1[i]} flex`);
            $formDiv.append($label, $input);
            $accordian.append($formDiv);

        }
    };
};

// Input boxes for the create aircraft menu
function createInputLoopCheckboxes(arr1, arr2) {
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input type=checkbox value=0 class=aircraft-chkbx>');
        const $label = $('<label>');
        $input.attr('id', arr1[i]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i + 1]);
        const $formDiv = $('<div>').addClass(`form-div-${arr1[i]}`);
        $formDiv.append($label, $input);
        $accordian.append($formDiv);
    };
};