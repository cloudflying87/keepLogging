var db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {

    // Routes for aircraft table per user id
app.get("/api/aircraft/", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/api/login");
    } else {
    db.Aircraft.findAll({
      include:[{
        model: db.AircraftModels,
        attributes:['tdesig']      
        }]
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    };
  });

  // Route for selecting one aircraft
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

  // Route for creating an aircraft
  app.post("/api/aircraft/", function (req, res) {
    if (!req.user) {
        res.redirect(307, "/login");
    } else {
    db.Aircraft.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    };
  });

  // Route for updating an aircraft
  app.put("/api/aircraft/update/:id", function (req, res) {
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

  // Route for deleting an aircraft
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
// this was for getting the tail number to link up with aircraft type
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
    db.FlightTime.findAll({
      // where: {UserId: req.user.id},
      where: {UserId: 1},
      attributes:['AircraftId'],
      include:[{
        model: db.Aircraft,
        attributes:['tailNumber'],
        // model: db.AircraftModels,
        // attributes:['tdesig']
      }],
       
      raw: true
    })
      .then(results => {
        let airCraft = []
        for (let i = 0; i < results.length; i++) {
          for (const value in results[i])
            airCraft.push(results[i][value])
        }
        res.json(airCraft)})
      .catch(err => res.status(404).json(err));
    // };
  });

};