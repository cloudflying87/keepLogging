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
        axios.get('/api/aircraft/userFind/'+aircraftType);
    },
    // putting aircraft types in a list for our dropdown menu
    getAircraftTypes: function() {
        axios.get('api/aircraftTypes');
    }
};