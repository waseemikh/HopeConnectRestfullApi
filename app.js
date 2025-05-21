const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./config/db");

const authController = require("./controllers/authController");
const UserController = require("./controllers/UserControllers");
const DonationController = require("./controllers/donationController");
const OrphanController = require("./controllers/orphanController");
const volunteerController = require("./controllers/volunteerController");
const emergencyController = require("./controllers/emergencyController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// api routes
app.use("/api/auth", authController);
app.use("/api/user", UserController);
app.use("/api/donation", DonationController);
app.use("/api/orphan", OrphanController);
app.use("/api/Volunteer", volunteerController);
app.use("api/emergency", emergencyController);

// error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
