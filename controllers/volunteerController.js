const express = require("express");
const volunteerModel = require("../models/Volunteer");
const router = express.Router();

//get all volunteer
router.get("/", async (req, res) => {
	try {
		const volunteers = await volunteerModel.findAll();
		if (!volunteers) {
			res.status(400).json({ error: "don't have volunteer" });
		} else {
			res.status(200).json(volunteers);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//get volunteer by id
router.get("/:id", async (req, res) => {
	try {
		const volunteer = await volunteerModel.findAll({
			where: { id: req.params.userId },
		});
		res.json(volunteer);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
// create Sponsor an volunteer
router.post("/", async (req, res) => {
	try {
		const createvolunteer = await volunteerModel.create(req.body);
		if (createvolunteer) {
			res.status(200).json(createvolunteer);
		} else {
			res.status(404).json({ error: "not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//delete volunteer
router.delete("/:id", async (req, res) => {
	try {
		const deletevolunteer = await volunteerModel.destroy({
			where: { id: req.params.id },
		});
		if (deletevolunteer) {
			res.status(200).send("volunteer Deleted");
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//update volunteer
router.put("/:id", async (req, res) => {
	try {
		const updatevolunteer = await volunteerModel.update(req.body, {
			where: { id: req.params.id },
		});
		if (updatevolunteer) {
			const updatevolunteer = await volunteerModel.findByPk(
				req.params.id
			);
			res.json(updatevolunteer);
		} else {
			res.status(404).json({ error: "volunteer not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
