const express = require("express");
const orphansModel = require("../models/Orphan");
const router = express.Router();

//get all orphans
router.get("/", async (req, res) => {
	try {
		const orphans = await orphansModel.findAll();
		if (!orphans) {
			res.status(400).json({ error: "don't have orphans" });
		} else {
			res.status(200).json(orphans);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//get orphan by id
router.get("/:id", async (req, res) => {
	try {
		const orphan = await orphansModel.findAll({
			where: { userId: req.params.userId },
		});
		res.json(orphan);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
// create Sponsor an orphan
router.post("/", async (req, res) => {
	try {
		const createOrphan = await orphansModel.create(req.body);
		if (createOrphan) {
			res.status(200).json(createOrphan);
		} else {
			res.status(404).json({ error: "not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//delete orphan
router.delete("/:id", async (req, res) => {
	try {
		const deleteOrphan = await orphansModel.destroy({
			where: { id: req.params.id },
		});
		if (deleteOrphan) {
			res.status(200).send("orphan Deleted");
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
});
//update orohan
router.put("/:id", async (req, res) => {
	try {
		const updateOrohan = await orphansModel.update(req.body, {
			where: { id: req.params.id },
		});
		if (updateOrohan) {
			const updatedOrohan = await orphansModel.findByPk(req.params.id);
			res.json(updatedOrohan);
		} else {
			res.status(404).json({ error: "orohan not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
