import axios from 'axios';

export default {
    // aircraft routes -----------------------------------------------------
    //get all aircraft
    getAircraft: function() {
        return axios.get('api/aircraft/');
    },
    // selecting one aircraft
    getOneAircraft: function(id) {
        return axios.get('/api/aircraft/'+id);
    },
    // create an aiarcraft
    createAircraft: function() {
        return axios.post('/api/aircraft/');
    },
    // update an aircraft
    updateAircraft: function(id) {
        return axios.put('/api/aircraft/update/'+id);
    },
    // delete an aircraft
    deleteAircraft: function(id) {
        return axios.delete('/api/aircraft/delte/'+id);
    },
    // translate aircraft type into id
    getAircraftId: function(aircraftType) {
        return axios.get('/api/aircraft/userFind/'+aircraftType);
    },
    // putting aircraft types in a list for our dropdown menu
    getAircraftTypes: function() {
        return axios.get('api/aircraftTypes');
    },
    // airport routes --------------------------------------------------------
    // all airports
    getAirports: function() {
        return axios.get('/api/airports/');
    },
    // get airport by id
    getOneAirport: function(id) {
        return axios.get('/api/airports/'+id);
    },
    // create an airport
    createAirport: function() {
        return axios.post('/api/airport');
    },
    // update airport
    updateAirport: function(id) {
        return axios.put('/api/airports/'+id);
    },
    deleteAirport: function(id) {
        return axios.delete('/api/airports/delete/'+id);
    },
    
};