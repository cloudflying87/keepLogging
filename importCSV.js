const fs = require('fs');
const mysql = require('mysql2');
const csv = require('fast-csv');
require('dotenv').config();
    let host = process.env.HOST_LOCAL
    let port = process.env.PORT_LOCAL
    let user = process.env.USER_LOCAL
    let password = process.env.PASS_LOCAL
    let database = process.env.NAME_LOCAL

var importFile = './db/sampleDataSmall2.csv'
// var importFile = './db/airplanes.csv'
let stream = fs.createReadStream(importFile);
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
		myData.shift();
        
        
        
        // let connection;
		// create a new connection to the database
		const connection = mysql.createConnection({
            // host: '',
            // port: 3306,
            // user: '',
            // password: '',
            // database: '',

            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
		});

        // open the connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else if (importFile =='./db/sampleDataSmall2.csv') {
				let query = 'INSERT INTO flighttimes (id,userId,date,tailnumber,depAir,enrRout,arrAir,flightNum,depTime,arrTime,landings,imc,hood,iap,holds,AircraftId,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student) VALUES ?';
				connection.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
			} else if (importFile =='./db/airplanes.csv') {
                let query = 'INSERT INTO aircraft (id,aircraftType,class,numEngine, tailWheel,complex,highPerf,turboFan,turboProp,rotorcraft,poweredLift) VALUES ?'
                    connection.query(query, [myData], (error, response) => {
                    console.log(error || response);
                })
            }
		});
   	});

stream.pipe(csvStream);


// const fs = require("fs");
// // const mysql = require("mysql");
// const fastcsv = require("fast-csv");
// var env       = process.env.NODE_ENV || 'development';
// var Sequelize = require('sequelize');
// var config    = require(__dirname + '/../config/config')[env];
// var db = require("../models");

// if (config.use_env_variable) {
//     var sequelize = new Sequelize(process.env[config.use_env_variable]);
//   } else {
//     var sequelize = new Sequelize(config.database, config.username, config.password, config);
//   }

// let stream = fs.createReadStream("sampledataSmall.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push(data);
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();

//     // create a new connection to the database
//     const connection = db.sequelize
      

//     // open the connection
//     connection.connect(error => {
//       if (error) {
//         console.error(error);
//       } else {
//         let query =
//           "INSERT INTO flighttimes (id, name, description, created_at) VALUES ?";
//         connection.query(query, [csvData], (error, response) => {
//           console.log(error || response);
//         });
//       }
//     });
//   });

// stream.pipe(csvStream);