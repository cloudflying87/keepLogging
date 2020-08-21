import axios from 'axios';

export default {
    // aircraft routes -----------------------------------------------------
    //get all aircraft
    getAircraft: function () {
        return axios.get('api/aircraft/');
    },
    // selecting one aircraft
    getOneAircraft: function (id) {
        return axios.get('/api/aircraft/' + id);
    },
    // create an aiarcraft
    createAircraft: function () {
        return axios.post('/api/aircraft/');
    },
    // update an aircraft
    updateAircraft: function (id) {
        return axios.put('/api/aircraft/update/' + id);
    },
    // delete an aircraft
    deleteAircraft: function (id) {
        return axios.delete('/api/aircraft/delte/' + id);
    },
    // translate aircraft type into id
    getAircraftId: function (aircraftType) {
        return axios.get('/api/aircraft/userFind/' + aircraftType);
    },
    // putting aircraft types in a list for our dropdown menu
    getAircraftTypes: function () {
        return axios.get('api/aircraftTypes/');
    },
    // airport routes --------------------------------------------------------
    // all airports

    getAirports: function (icao) {
        return axios.get('/api/airports/' + icao);
    },
    // get airport by id
    getOneAirport: function (id) {
        return axios.get('/api/airports/' + id);
    },
    // create an airport
    createAirport: function () {
        return axios.post('/api/airport');
    },
    // update airport
    updateAirport: function (id) {
        return axios.put('/api/airports/' + id);
    },

    sunriseSunset: function (date, lat, long) {
        return axios.get('/api/nighttime?date=' + date._i + '&lat=' + lat + '&long=' + long);
    },
    deleteAirport: function (id) {
        return axios.delete('/api/airports/delete/' + id);
    },
    // flight_time routes ----------------------------------------------------------------
    // get all flight_times for the user
    getFlights: function () {
        return axios.get('/api/flight_time/');
    },
    // select one flight_time
    getOneFlight: function (userId, id) {
        return axios.get(`/api/flight_time/${userId}/${id}`);
    },
    // create a flight_time

    createFlight: function (flightData) {
        return axios.post('/api/flight_time', (flightData));
    },
    // update a flight_time
    updateFlight: function (id) {
        return axios.put('/api/flight_time/update/' + id);
    },
    // delete a flight_time
    deleteFlight: function (id) {
        return axios.delete(`/api/flight_time/delete/${id}`);
    },
    // get flight_time totals
    getFlightTotals: function () {
        return axios.get('/api/flight_times/totals/');
    },

    // -------------------------------------------------------------------------------
    // user login routes
    //login user
    userLogin: function (userData) {
        return axios.post('/api/login', userData);
    },
    // sign up a user
    userSignUp: function (userData) {
        return axios.post('/api/signup', userData);
    },
    // log out a user
    userLogOut: function () {
        return axios.get('/logout');
    },
    // getting user data to be used client side
    userData: function () {
        return axios.get('/api/user_data');
    },
    userVerify: function (email) {
        return axios.post('/api/verifyAccount', email);
    },
    userAccess: function (key, email) {
        return axios.post('/api/addAccess', key, email);
    },
    sendMail: function (message) {
        return axios.post('/api/sendMail', message);
    }
}




