const fs = require('fs');
const mysql = require('mysql2');
const csv = require('fast-csv');
require('dotenv').config();
let host = process.env.DB_HOST
let port = process.env.DB_PORT
let user = process.env.DB_USER
let password = process.env.DB_PASS
let database = process.env.DB_NAME
let connection;


let stream = fs.createReadStream("sampledataSmall.csv");
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
		myData.shift();
		
		// create a new connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: '',
			password: '',
			database: 'logbook_db'
		});

        // open the connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
				let query = 'INSERT INTO flighttimes (id,userId,date,airCraftId,depAir,enrRout,arrAir,flightNum,depTime,arrTime,landings,imc,hood,iap,holds,aircraftType,pic,sic,cfi,dualI,cxt,solo,total,dayLdg,night,nightLdg,comments,instructor,student) VALUES ?';
				connection.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
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