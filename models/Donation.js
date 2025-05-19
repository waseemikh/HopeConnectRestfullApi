const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Orphan = require("./Orphan");
const Orphanage = require("./Orphanage");

const Donation = sequelize.define(
	"Donation",
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM("General", "Education", "Medical"),
			allowNull: false,
		},
		amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		currency: { type: DataTypes.STRING(3), defaultValue: "USD" },
		category: { type: DataTypes.STRING },
		status: {
			type: DataTypes.ENUM("Pending", "Completed", "Failed"),
			defaultValue: "Completed",
		},
	},
	{
		tableName: "donations",
		timestamps: true,
	}
);

// Associations
User.hasMany(Donation, { foreignKey: "userId" });
Donation.belongsTo(User, { foreignKey: "userId" });

Orphan.hasMany(Donation, { foreignKey: "orphanId" });
Donation.belongsTo(Orphan, { foreignKey: "orphanId" });

Orphanage.hasMany(Donation, { foreignKey: "orphanageId" });
Donation.belongsTo(Orphanage, { foreignKey: "orphanageId" });

module.exports = Donation;
