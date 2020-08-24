var passport = require("../config/passport");
var db = require("../models");
const path = require('path')
const sequelize = require("sequelize");
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    res.json(req.user)
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
    res.redirect("/login");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    // if (!req.user) {
    // The user is not logged in, send back an empty object
    // res.json({});
    // } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      access: req.user.accountAccess
    });
    // }
  });

  // -----------------------------------------------------------------------------------------
  app.post("/api/verifyAccount", function (req, res) {
    // console.log("verifyAccount req.body: ",req.body)
    // res.send(req.body)
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.User.findAll({
      where: {
        email: req.body.studentEmail
      },
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  })

  app.post("/api/sendMail", function (req, res) {
    const { email } = req.body;
    const { ID } = req.body;
    const { user } = req.body;

    // console.log("line 78", email)
    // console.log("line 79", user)
    console.log("line 80", user)
    // console.log(user.data.id)
    main()
      .catch(err => console.log(err))

    async function main() {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.flyhomemn.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "keeplogging@flyhomemn.com", // generated ethereal user
          pass: "keeplogging", // generated ethereal password
        },
      });
      const key = randomstring.generate()
      const info = await transporter.sendMail({
        from: '"keep_logging" <keeplogging@flyhomemn.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `${user.data.email} would like to connect with you on KeepLogging`, // Subject line
        // text: "A user would like to connect with you on KeepLogging. Please click confirm if you would like to proceed", // plain text body
        html: `<p>${user.data.email} would like to connect with you on KeepLogging. Please click confirm if you would like to proceed</p><a href="http://localhost:3000/redirect/${key}/${ID}" class="button" >Confirm</a>`, // html body

      })
      // db.products.insert( { item: "card", qty: 15 } )
      db.userPreferences.create({
        instructorID: user.data.id,
        Access: key
      })


      console.log("Message sent: %s", info.messageId);
      // console.log("Message sent: %s", info);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.json(info)

    }
  })

  app.post("/api/addAccess", function (req, res) {
    console.log("routes 126", req.body)
    db.userPreferences.update(
      { studentID: req.body.ID },
      { where: { Access: req.body.key } }
    )
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  })

  // route for getting the student id's associated with an instructor.
  app.get("/api/getStudents/:id", (req, res) => {
    if (!req.user) {
      res.redirect(307, '/');
    } else {
      db.userPreferences.findAll({
        where: {
          instructorID: req.params.id.toString()
        }
      })
        .then(results => res.json(results))
        .catch(err => res.status(404).json(err));
    }
  })
}