// const util = require("util");
const $div = $("<div>");
const $accordian = $("#dyn-form");
var aircraftDropDown;
let flightEditId = 0;
let userData = {};
let toggle = {
    tab: "",
    value: false
};
let aircraftDropDownValues = [];
var windowScroll;