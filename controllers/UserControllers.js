const express = require("express");
const userModel = require("../models/User");
const router = express.Router();

//get all users
router.get("/", async (req, res) => {
	try {
		const users = await userModel.findAll();
		if (users) {
			res.status(201).json(users);
		} else {
			res.status(400).json({ error: "empty table" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
// get one user by id
router.get("/:id", async (req, res) => {
	try {
		const singleUser = await userModel.findByPk(req.params.id);
		if (singleUser) {
			res.status(201).json(singleUser);
		} else {
			res.status(400).json({ error: "user not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//update user by id
router.put("/:id", async (req, res) => {
	try {
		const updateUser = await userModel.update(req.body, {
			where: { id: req.params.id },
		});
		if (updateUser) {
			const updateduser = await userModel.findByPk(req.params.id);
			res.json(updateduser);
		} else {
			res.status(404).json({ error: "user not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//delete user by id
router.delete("/:id", async (req, res) => {
	try {
		const deleteUser = await userModel.destroy({
			where: { id: req.params.id },
		});
		if (deleteUser) {
			res.status(200).send("user deleted");
		} else {
			res.status(400).json({ error: "not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
