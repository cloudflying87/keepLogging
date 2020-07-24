const fs = require('fs');
const mysql = require('mysql2');
const csv = require('fast-csv');
var importing
require('dotenv').config();
    let host = process.env.HOST_LOCAL
    let port = process.env.PORT_LOCAL
    let user = process.env.USER_LOCAL
    let password = process.env.PASS_LOCAL
    let database = process.env.NAME_LOCAL

// var importFile = './db/sampleDataSmall2.csv'
// var importFile = './db/airplanes.csv'
var importFile = ['./db/users.csv','./db/airplanes.csv','./db/airports.csv','./db/sampleDataSmall2.csv']
for (let i = 0; i < importFile.length; i++) {
    importing = true
    let stream = fs.createReadStream(importFile[i]);
    let myData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            myData.push(data);
        })
        .on("end", function () {
            myData.shift();
            const connection = mysql.createConnection({
                host: host,
                port: port,
                user: user,
                password: password,
                database: database,
            });

            connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else if (importFile[i] =='./db/sampleDataSmall2.csv') {
                    let query = 'INSERT INTO flighttimes (id,UserId,date,tailnumber,depAir,enrRout,arrAir,flightNum,depTime,arrTime,landings,imc,hood,iap,holds,AircraftId,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student,createdAt,updatedAt) VALUES ?';
                    connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    });
                } else if (importFile[i] =='./db/airplanes.csv') {
                    let query = 'INSERT INTO aircraft (id,aircraftType,class,numEngine, tailWheel,complex,highPerf,turboFan,turboProp,rotorcraft,poweredLift,createdAt,updatedAt) VALUES ?'
                        connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else if (importFile [i] =='./db/airports.csv') {
                    let query = 'INSERT INTO airports (id,airportName,airportCity,airportCountry,threeLetter,icao,latitude,longitude,airportElevation,timeZone,timeZoneName,createdAt,updatedAt) VALUES ?'
                        connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                    })
                } else if (importFile [i] =='./db/users.csv') {
                    let query = 'INSERT INTO users (id,email,password,createdAt,updatedAt) VALUES ?'
                        connection.query(query, [myData], (error, response) => {
                        console.log(error || response);
                        });
                };
            });
        });

    stream.pipe(csvStream);
}

