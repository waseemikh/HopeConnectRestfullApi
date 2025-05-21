module.exports = (sequelize, DataTypes) => {
	const Emergency = sequelize.define("Emergency", {
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		raisedAmount: DataTypes.FLOAT,
	});
	return Emergency;
};
