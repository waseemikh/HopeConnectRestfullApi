const express = require("express");
const Logistics = require("../models/logistic");
const router = express.Router();

//get all requests
router.get("/", async (req, res) => {
	try {
		const allLogistics = await Logistics.findAll();
		res.status(200).json(allLogistics);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//create logistic
router.post("/pickup", async (req, res) => {
	try {
		const { type, status, assignedTo } = req.body;
		const delivery = await Logistics.create({ type, status, assignedTo });
		res.status(200).json(delivery);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//track the delivery
router.get("/track/:id", async (req, res) => {
	try {
		const track = await Logistics.findByPk(req.params.id);
		res.json(track);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//assign driver
router.put("/assign/:id", async (req, res) => {
	try {
		const delivery = await Logistics.findByPk(req.body.id);
		delivery.assignedTo = req.body.driver;
		await delivery.save();
		res.status(200).json(delivery);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//get all activate routes
router.get("/routes", async (req, res) => {
	try {
		const deliveries = await Logistics.findAll({
			where: { status: "active" },
		});
		res.status(200).json(deliveries);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//delete logistic
router.delete("/:id", async (req, res) => {
	try {
		const deleteLogistics = await Logistics.destroy({
			where: { id: req.params.id },
		});
		if (deleteLogistics) {
			res.status(200).send("Logistics Deleted");
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
module.exports = router;
