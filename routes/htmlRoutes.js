// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// export the module as a function for use in our server.js file
module.exports = function (app) {
  /*

  // retrives our root route
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page

    if (req.user) {
      res.redirect("/logbook");
    }
    // if user does not have an account, send them to the signup page
    res.sendFile(path.join(__dirname, "../public/authenticate.html"));
  });

  // retrieves the login.html page
  app.get("/login", function(req, res) {
    // If the user already has an account and is logged in send them to the main page
    if (req.user) {
      res.redirect("/logbook");
    }
    // if the user has an account and is not logged in, send them to login.html.
    res.sendFile(path.join(__dirname, "../public/authenticate.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // isAuthenticated is declared in config>middleware and determines if the user has an account, if they do not, it redirects them to the login page
  // app.get("/main", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/main.html"));
  // });
  */

  app.use((req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  );

};
