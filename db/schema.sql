DROP DATABASE IF EXISTS logbook_db;
CREATE DATABASE logbook_db;

USE logbook_db;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(20),
    accountAccess VARCHAR(30)
);

CREATE TABLE aircraft (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    aircraftType VARCHAR(10) NOT NULL,
    class VARCHAR(15),
    numEngine INT,
    tailWheel BOOLEAN DEFAULT 0,
    complex BOOLEAN DEFAULT 0,
    highPerf BOOLEAN DEFAULT 0,
    turboFan BOOLEAN DEFAULT 0,
    turboProp BOOLEAN DEFAULT 0,
    rotorcraft BOOLEAN DEFAULT 0,
    poweredLift BOOLEAN DEFAULT 0
);

CREATE TABLE flight_time (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userId INT, 
    date DATE NOT NULL,
    aircraftID VARCHAR(10),
    depAir VARCHAR(4),
    enrRoute VARCHAR(50),
    arrAir VARCHAR(4),
    flightNum INT,
    depTime TIME,
    arrTime TIME,
    landings INT,
    imc DECIMAL(5, 2), -- instrument meteorological conditions (cloud stuff)
    hood DECIMAL(5, 2), -- simulating IMC
    iap INT, -- instrument approaches
    holds INT,
    aircraftType INT, -- takes info from aircraft table
    pic DECIMAL(5, 2),
    sic DECIMAL(5, 2),
    cfi DECIMAL(5, 2),
    dualI DECIMAL(5, 2),
    cxt DECIMAL(5, 2),
    comments VARCHAR(255), 
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (aircraftType) REFERENCES aircraft(id)
); 

-- -- maybe grab this info from API or download it into a table? TBD.
-- CREATE TABLE airports (

-- );


