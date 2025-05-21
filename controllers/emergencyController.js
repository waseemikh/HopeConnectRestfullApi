const express = require("express");
const Emergency = require("../models/emergency");
const router = express.Router();

//get listEmergencies
router.get("/", async (req, res) => {
	try {
		const emergencies = await Emergency.findAll();
		res.status(200).json(emergencies);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//Contribute to emergency
router.post(":id/contribute", async (req, res) => {
	try {
		const emergency = await Emergency.findByPk(req.params.id);
		emergency.raisedAmount += req.body.amount;
		await emergency.save();
		res.status(200).json(emergency);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//Notify donors
router.post("notifications/email", async (req, res) => {
	try {
		res.status(200).json({ message: "Donors notified via email." });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//get single Emergencies
router.get("/:id", async (req, res) => {
	try {
		const emergency = await Emergency.findByPk(req.params.id);
		res.status(200).json(emergency);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//delete emergency
router.delete("/:id", async (req, res) => {
	try {
		const deleteEmergency = await Emergency.destroy({
			where: { id: req.params.id },
		});
		if (deleteEmergency) {
			res.status(200).send("Emergency Deleted");
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
module.exports = router;
