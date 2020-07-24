const fs = require('fs');
const mysql = require('mysql2');
const csv = require('fast-csv');
require('dotenv').config();
    let host = process.env.HOST_LOCAL
    let port = process.env.PORT_LOCAL
    let user = process.env.USER_LOCAL
    let password = process.env.PASS_LOCAL
    let database = process.env.NAME_LOCAL

// var importFile = './db/sampleDataSmall2.csv'
// var importFile = './db/airplanes.csv'
var importFile = './db/airports.csv'
let stream = fs.createReadStream(importFile);
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
			} else if (importFile =='./db/sampleDataSmall2.csv') {
				let query = 'INSERT INTO flighttimes (id,UserId,date,tailnumber,depAir,enrRout,arrAir,flightNum,depTime,arrTime,landings,imc,hood,iap,holds,AircraftId,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student) VALUES ?';
				connection.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
			} else if (importFile =='./db/airplanes.csv') {
                let query = 'INSERT INTO aircraft (id,aircraftType,class,numEngine, tailWheel,complex,highPerf,turboFan,turboProp,rotorcraft,poweredLift) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                    console.log(error || response);
                })
            } else if (importFile =='./db/airports.csv') {
                let query = 'INSERT INTO airports (id,airportName,airportCity,airportCountry,threeLetter,icao,latitude,longitude,airportElevation,timeZone,timeZoneName) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                    console.log(error || response);
                })
            }
		});
   	});

stream.pipe(csvStream);