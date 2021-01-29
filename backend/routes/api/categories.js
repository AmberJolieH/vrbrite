const express = require("express");
const asyncHandler = require("express-async-handler");

const { EventCategory } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const categories = await EventCategory.findAll({
			order: [["name", "ASC"]],
		});

		return res.json({ categories });
	})
);

module.exports = router;
