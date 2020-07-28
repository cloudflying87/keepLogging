// functions for dynamically creating forms
function createInputLoop(arr1, arr2) {
    $accordian.append(arr2[0], '<hr>')
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i]=='aircraftID'){
            const $dropdown = $('<select>')
            $dropdown.attr('id', arr1[i]);
            const $label = $("<label>");
            const $newAir = $('<a href =#>');
            $newAir.attr('id','addAircraftShortcut')
            $newAir.text(' :Add Aircraft')
            $dropdown.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            $label.append($newAir)
            $accordian.append($label, $dropdown);
        } else {
            const $input = $('<input class=form-control>');
            const $label = $("<label>");
            $input.attr('id', arr1[i]);
            $input.attr('placeholder', arr1[0]);
            $input.addClass(arr2[1]);
            $label.text(arr2[i + 1]);
            $accordian.append($label, $input);
        }
    };
};

// Input boxes for the create aircraft menu
function createInputLoopCheckboxes(arr1, arr2) {
    $accordian.append(arr2[0], '<hr>')
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input type=checkbox value=0 class=aircraft-chkbx>');
        const $label = $('<label>');
        $input.attr('id', arr1[i]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i + 1]);
        // $div.addClass("input-group-prepend");
        // $div.append($input)
        $accordian.append($label, $input);
    };
};