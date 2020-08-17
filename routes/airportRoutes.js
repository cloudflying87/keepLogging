var db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {

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
            icao: req.params.id
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