# Passport Guide
This is a walk through of how the passport NPM package works. The start of the application is the server file just like every full stack application. The new sections of on the server.js file include. 

```javascript
// Controls how long the user will be logged into the site
// handles cookies and keeps the user logged in 
var session = require("express-session");

// Requiring passport as we've configured it this takes us to our next file in the sequence of files being passport.js
var passport = require("./config/passport");
var db = require("./models");

// We need to use sessions to keep track of our user's login status and determing which parts of our website they are allowed to access with that login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
```

In the above code we require two files as well as start to initialize the routes that we will use throughout the app. Also in the server.js we start listening on port 8080. The new file that we have to look at is passport.js. 

```javascript 
// Calling in the passport package. 
var passport = require("passport");
// This is where we are determining the type of authorization that we will use for this session. There are several different options that we could use, but choose local for this application. 
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport that we will use throughout the app to make everything work for us. 
module.exports = passport;
```

This is the key to the whole new process of using authentication. We will see this throughout our route structure to verify that a user is logged in. We still have our config.json which is where our database access is controlled. We also have a new middleware function associated with passport called isAuthenticated.js. It is a basic if statement to verify that req.user is true.

```javascript
// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/login");
};
```

We have 2 different models in this initial setup. Index.js is created by sequelize. user.js is the one that we use for saving our user information and verifying that they are able to be authenticated to access the system. Here are our notes on the user.js file. 

```javascript
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    // use compareSync() method of bcrypt to compare the hashed password to the user's password
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};

```

Every user will first have to be verified through the user.js interaction with the database before they are able to proceed with the application. The files in the route folder are pretty standard to what we have done in the past except we add a condition statement to verify that the user is logged in before they can view member only portions of the site. We also use the new passport middleware to make that happen as seen below. 

```javascript
// retrieves the login.html page
  app.get("/login", function(req, res) {
    // If the user already has an account and is logged in send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // if the user has an account and is not logged in, send them to login.html.
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // isAuthenticated is declared in config>middleware and determines if the user has an account, if they do not, it redirects them to the login page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
```

The api-routes.js works very similarly using the conditional statement and a .then to redirect if the user is not logged in. Here are the notes on the specific code. 

```javascript
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// exporting this as a function to use in server.js
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // sending req.user, which comes from an validated passport.authenticate invocation, to the front end, which 
    // req.user = {
    //   email: email,
    //   password: pass
    // }
    console.log("req.user: ", req.user)
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    // creates a new user with email and password
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
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
};
```
The front end does not have anything different with the passport package because it is all dealt with on the back end. There is just the normal javascript to pass the information to the server to then be handled there. That is a basic description of what is going on when a user authenticates using local method with passport. 