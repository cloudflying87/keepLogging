var db = require("../models");
const sequelize = require("sequelize");
const util = require("util");
var SunCalc = require('suncalc');
const WorkingFlightTime = require("../util/flightTimeWorking.js")
const { col } = require("sequelize");

module.exports = function(app) {

  // Routes for flight_time table per user id
 app.get("/api/flight_time/", function (req, res) {
   console.log('req.user: ',req.user)
  if (!req.user) {
      res.error(307, "/");
  } else {
  db.FlightTime.findAll({
    where: {
      UserId: req.user.id
    },
    include: [{
      model: db.Aircraft,
      attributes: ['tailNumber']
    }],
    attributes: {
      exclude: ["createdAt", "updatedAt", "AircraftId", "UserId"]
    },
    raw: true
  })
    .then(results => res.json(results))
    .catch(err => res.status(404).json(err));
  };
});

// Route for selecting one flight_time
app.get("/api/flight_time/:userId/:id", function (req, res) {
  if (!req.user) {
    res.redirect(307, "/login");
  } else {
  db.FlightTime.findAll({
    where: {
      UserId: req.params.userId,
      id: req.params.id
    },
    include: [{
      model: db.Aircraft,
      attributes: ['aircraftType']
    }],
    // include: [db.Aircraft, db.Airport.icao]
  })
    .then(results => res.json(results))
    .catch(err => res.status(404).json(err));
  };
});

// Route for creating a flight_time
app.post("/api/flight_time/", async function (req, res) {
  // if (!req.user) {
  //     res.redirect(307, "/login");
  // } else {
  const flightData = await WorkingFlightTime(req.body)
    await (db.FlightTime.create(flightData))
    .then(results => res.json(results))
    .catch(err => res.status(404).json(err.message))
  // };
});

// Route for updating a flight_time
app.put("/api/flight_time/update/:UserId/:id", function (req, res) {
  if (!req.user) {
    res.redirect(307, "/api/login");
  } else {
  db.FlightTime.update(req.body, {
    where: {
      UserId: req.params.UserId,
      id: req.params.id
    }
  })
    .then(results => res.json(results))
    .catch(err => res.status(404).json(err));
  };
});

// Route for deleting a flight_time
app.delete("/api/flight_time/delete/:UserId/:id", function (req, res) {
  if (!req.user) {
    res.redirect(307, "/api/login");
  } else {
  db.FlightTime.destroy({
    where: {
      UserId: req.params.UserId,
      id: req.params.id
    }
  })
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
  };
});
// I cant get this call to work if I use flight_time. I think it is calling the get request above that has two // after flight times. I am sure I am doing something wrong I just dont know what it is. 
app.get("/api/flight_times/totals/", function (req, res) {
  if (!req.user) {
      res.redirect(307, "/api/login");
  } else {
  db.FlightTime
    .findAll({
      where: {UserId: req.user.id},
      attributes: [
        [sequelize.fn('sum', sequelize.col('imc')), 'imc'],
        [sequelize.fn('sum', sequelize.col('hood')), 'hood'],
        [sequelize.fn('sum', sequelize.col('iap')), 'iap'],
        [sequelize.fn('sum', sequelize.col('holds')), 'holds'],
        [sequelize.fn('sum', sequelize.col('cxt')), 'cxt'],
        [sequelize.fn('sum', sequelize.col('landings')), 'landings'],
        [sequelize.fn('sum', sequelize.col('dayLdg')), 'dayLdg'],
        [sequelize.fn('sum', sequelize.col('nightLdg')), 'nightLdg'],
        [sequelize.fn('sum', sequelize.col('pic')), 'pic'],
        [sequelize.fn('sum', sequelize.col('sic')), 'sic'],
        [sequelize.fn('sum', sequelize.col('cfi')), 'cfi'],
        [sequelize.fn('sum', sequelize.col('dualI')), 'dualI'],
        [sequelize.fn('sum', sequelize.col('solo')), 'solo'],
        [sequelize.fn('sum', sequelize.col('total')), 'total'],
        [sequelize.fn('sum', sequelize.col('night')), 'night'],
      ],
      
      raw: true
    })
    .then(sum => res.json(sum))
    .catch(err => res.status(404).json(err));
  };
});
app.get("/api/nighttime?", function (req, res) {
  // const sunTime = SunCalc.getTimes(req.params.date,
  //     req.query.lat,req.query.long)
   const sunTime = SunCalc.getTimes(new Date(),req.query.lat,req.query.long)    
  res.json(sunTime)
})

}
 
