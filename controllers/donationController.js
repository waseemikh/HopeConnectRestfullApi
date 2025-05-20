const express = require("express");
const donationModel = require("../models/Donation");
const router = express.Router();

//create a new donation
router.post("/createDonation", async (req, res) => {
	try {
		const donation = await donationModel.create(req.body);
		res.status(201).json(donation);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//get all donation
router.get("/", async (req, res) => {
	try {
		const donations = await donationModel.findAll();
		if (!donations) {
			res.status(400).json({ error: "don't have donations" });
		} else {
			res.status(200).json(donations);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
// get donation by userid
router.get("/:userId", async (req, res) => {
	try {
		const donations = await donationModel.findAll({
			where: { userId: req.params.userId },
		});
		res.json(donations);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//get donations gategories
router.get("/donationcategory", async (req, res) => {
	try {
		const donationCategories = await donationModel.findAll({
			attributes: ["type"],
		});
		if (donationCategories) {
			res.status(200).json(donationCategories);
		} else {
			res.status(400).json({ error: "not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//delete donation by id
router.delete("/:id", async (req, res) => {
	try {
		const deleteDonation = await donationModel.destroy({
			where: { id: req.params.id },
		});
		if (deleteDonation) {
			res.status(200).send("Donation Deleted");
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//update donation by id
router.put("/:id", async (req, res) => {
	try {
		const updatedoantion = await donationModel.update(req.body, {
			where: { id: req.params.id },
		});
		if (updatedoantion) {
			const updatedonation = await donationModel.findByPk(req.params.id);
			res.json(updatedonation);
		} else {
			res.status(404).json({ error: "user not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
