require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.USER_LOCAL,
    "password": process.env.PASS_LOCAL,
    "database": process.env.NAME_LOCAL,
    "host": process.env.HOST_LOCAL,
    "port": process.env.PORT_LOCAL,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}