// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const sequelize = require("sequelize");
const { col } = require("sequelize");

// exporting this as a function to use in server.js
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
      res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // creates a new user with email and password
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //--------------------------------------------------------------------------------------------------------------------
  // flight_time routes begin here


  // Routes for flight_time table per user id
  app.get("/api/flight_time/:userId", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/api/login");
    } else {
    db.FlightTime.findAll({
      where: {
        UserId: req.params.userId
      },
      include: [{
        model: db.Aircraft,
        attributes: ['aircraftType']
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
  app.post("/api/flight_time/", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/login");
    } else {
    db.FlightTime.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err.message));
    };
  });

  // Route for updating a flight_time
  app.post("/api/flight_time/update/:UserId/:id", function (req, res) {
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
  app.get("/api/flight_times/totals/:userId/", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/api/login");
    } else {
    db.FlightTime
      .findAll({
        where: {UserId: req.params.userId},
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
  // ----------------------------------------------------------
  // aircraft routes begin here


  // Routes for flight_time table per user id
  app.get("/api/aircraft/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/api/login");
    // } else {
    db.Aircraft.findAll({})
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for selecting one flight_time
  app.get("/api/aircraft/:id", function (req, res) {
    if (!req.user) {
      res.redirect(307, "/login");
    } else {
    db.Aircraft.findAll({
      where: {
        id: req.params.id
      },
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    };
  });

  // Route for creating a flight_time
  app.post("/api/aircraft/", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/login");
    } else {
    db.Aircraft.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    };
  });

  // Route for updating a flight_time
  app.post("/api/aircraft/update/:id", function (req, res) {
    if (!req.user) {
      res.redirect(307, "/api/login");
    } else {
    db.Aircraft.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    };
  });

  // Route for deleting a flight_time
  app.delete("/api/aircraft/delete/:id", function (req, res) {
    if (!req.user) {
      res.redirect(307, "/api/login");
    } else {
    db.Aircraft.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
    };
  });

  app.get("/api/aircraft/userFind/:aircraftType", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Aircraft.findAll({
      where:{
        aircraftType: req.params.aircraftType
      },
      // attributes: {
      //   exclude: ['class','aircraftType','numEngine','tailWheel','complex','highPerf','turboFan','turboProp','rotorcraft','poweredLift','createdAt','updatedAt']
      // },
    }).map(i => i.get('id'))
      .then(results => {
        
        res.json(results)
      })

      .catch(err => res.status(404).json(err));
    // };
  });

  app.get("/api/aircraftTypes/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/api/login");
    // } else {
    db.Aircraft.findAll({
      attributes:['aircraftType'], 
      raw: true
    })
      .then(results => {
        let airCraft = []
        for (let i = 0; i < results.length; i++) {
          for (const value in results[i])
            // airCraft.push({'text':results[i][value]})
            airCraft.push(results[i][value])
        }
        res.json(airCraft)})
      .catch(err => res.status(404).json(err));
    // };
  });

  // -----------------------------------------
  // Airport Routes

  app.get("/api/airports/", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Airport.findAll()
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.get("/api/airports/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Airport.findAll({
      where: {
        id: req.params.id
      },
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.post("/api/airports/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/login");
    // } else {
    db.Airport.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.post("/api/airports/update/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Airport.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.delete("/api/airports/delete/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Airport.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
    // };
  });

  // app.get("/api/airports/test", function (req, res) {
  //   // if (!req.user) {
  //   //   res.redirect(307, "/api/login");
  //   // } else {
  //     const airportTest = sequelize.query(
  //       'SELECT flighttimes.id , arr.latitude, arr.longitude, dep.latitude, dep.longitude FROM logbook_db.flighttimes ftime left outer join airports dep on ftime.depAir = dep.icao left outer join airports arr on ftime.arrAir = arr.icao;',
  //       {
  //       type:QueryTypes.SELECT,
  //     })
  //       .then(results => {
  //         console.log(results)
  //         res.json(results)
  //       })

  //       .catch(err => res.status(400).json(err));
  // });


};
