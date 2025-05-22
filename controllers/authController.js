const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		if (!name || !email || !password || !role) {
			return res.status(400).json({ error: "Missing fields" });
		}
		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashed, role });
		res.status(201).json({ id: user.id, email: user.email });
	} catch (err) {
		res.status(400).json({ err: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET || "dev_secret", // fallback for development
			{ expiresIn: "1d" }
		);
		res.json({ token });
	} catch (err) {
		res.status(400).json({ error: "Login failed" });
	}
});

module.exports = router;
