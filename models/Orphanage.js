const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Orphanage = sequelize.define(
	"Orphanage",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		address: { type: DataTypes.STRING, allowNull: false },
		contactEmail: { type: DataTypes.STRING, validate: { isEmail: true } },
		verified: { type: DataTypes.BOOLEAN, defaultValue: false },
	},
	{
		tableName: "orphanages",
		timestamps: true,
	}
);

module.exports = Orphanage;
