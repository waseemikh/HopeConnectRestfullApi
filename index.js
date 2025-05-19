const sequelize = require("../config/db");
const User = require("./User");
const Orphan = require("./Orphan");
const Orphanage = require("./Orphanage");
const Donation = require("./Donation");
const Volunteer = require("./Volunteer");

// associations here if needed
module.exports = { sequelize, User, Orphan, Orphanage, Donation, Volunteer };
