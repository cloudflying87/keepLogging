const fs = require('fs');
const mysql = require('mysql2');
const csv = require('fast-csv');
const path = require("path");
require('dotenv').config();

let host = process.env.HOST_LOCAL
let port = process.env.PORT_LOCAL
let user = process.env.USER_LOCAL
let password = process.env.PASS_LOCAL
let database = process.env.NAME_LOCAL
let connection;



var importFile = [
    path.join(__dirname, './db/users.csv'),
    path.join(__dirname, './db/airportone.csv'),
    path.join(__dirname, './db/airporttwo.csv'),
    path.join(__dirname, './db/aircraftModels.csv'),
    path.join(__dirname, './db/aircraft.csv'),
    path.join(__dirname, './db/sampledata.csv')
]
for (let i = 0; i < importFile.length; i++) {
    let stream = fs.createReadStream(importFile[i]);
    let myData = [];

    let csvStream = csv
        .parse()
        .on("data", function (data) {
            myData.push(data);

        })
        .on("end", function () {
            myData.shift();

            if (process.env.JAWSDB_URL) {
                connection = mysql.createConnection(process.env.JAWSDB_URL);
            } else {
                connection = mysql.createConnection({
                    host: host,
                    port: port,
                    user: user,
                    password: password,
                    database: database,
                });
            };
            connection.connect((error) => {

                if (error) {

                    console.error(error);
                } else if (importFile[i] == './db/sampledata.csv') {
                    let query = 'INSERT INTO FlightTimes (id,UserId,date,AircraftId,route,flightNum,depTime,arrTime,landings,imc,hood,iap,holds,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student,createdAt,updatedAt) VALUES ?';
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    });
                } else if (importFile[i] == './db/aircraftModels.csv') {
                    console.log("models")
                    let query = 'INSERT INTO AircraftModels (id,manufacture_code,description,category_class,engine_count,engine_type,wtc,tdesig,complex,highPerf,tailWheel,taa,simulator,createdAt,updatedAt) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else if (importFile[i] == './db/airportone.csv') {
                    console.log("airports")
                    let query = 'INSERT INTO Airports (id,icao,iata,name,city,state,country,elevation,lat,lon,tz,createdAt,updatedAt) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else if (importFile[i] == './db/airporttwo.csv') {
                    console.log("airports")
                    let query = 'INSERT INTO Airports (id,icao,iata,name,city,state,country,elevation,lat,lon,tz,createdAt,updatedAt) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else if (importFile[i] == './db/users.csv') {
                    console.log("users")
                    let query = 'INSERT INTO Users (id,email,password,createdAt,updatedAt) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    });

                } else if (importFile[i] == './db/aircraft.csv') {
                    console.log("aircraft")
                    let query = 'INSERT INTO Aircraft (id,tailNumber,AircraftModelId,avionics,createdAt,updatedAt) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else {
                    console.log("Test", myData.length)
                }
            });
        });
    stream.pipe(csvStream);

}

