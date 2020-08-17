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
    // flight_time routes ----------------------------------------------------------------
    // get all flight_times for the user
    getFlights: function(userId) {
        return axios.get('/api/flight_time/'+userId);
    },
    // select one flight_time
    getOneFlight: function(userId, id) {
        return axios.get(`/api/flight_time/${userId}/${id}`);
    },
    // create a flight_time
    createFlight: function() {
        return axios.post('/api/flight_time/');
    },
    // update a flight_time
    updateFlight: function(userId, id) {
        return axios.put(`/api/flight_time/update/${userId}/${id}`);
    },
    // delete a flight_time
    deleteFlight: function(userId, id) {
        return axios.put(`/api/flight_time/delete/${userId}/${id}`);
    },
    // get flight_time totals
    getFlightTotals: function(userId) {
        return axios.get('/api/flight_times/totals/'+userId);
    }
};