const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Volunteer = sequelize.define(
	"Volunteer",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		skills: { type: DataTypes.STRING, allowNull: false },
		availability: { type: DataTypes.STRING },
	},
	{
		tableName: "volunteers",
		timestamps: true,
	}
);

// Link volunteer to user
User.hasOne(Volunteer, { foreignKey: "userId" });
Volunteer.belongsTo(User, { foreignKey: "userId" });

module.exports = Volunteer;
