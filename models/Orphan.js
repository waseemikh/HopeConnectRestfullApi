const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Orphan = sequelize.define(
	"Orphan",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
		educationStatus: { type: DataTypes.STRING },
		healthCondition: { type: DataTypes.STRING },
		photoUrl: { type: DataTypes.STRING },
	},
	{
		tableName: "orphans",
		timestamps: true,
	}
);

module.exports = Orphan;
