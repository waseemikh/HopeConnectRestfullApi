const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const logistic = sequelize.define("Logistics", {
	type: DataTypes.STRING,
	status: DataTypes.STRING,
	assignedTo: DataTypes.STRING,
});
module.exports = logistic;
