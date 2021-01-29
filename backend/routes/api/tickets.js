const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth.js");

const { Event, Ticket } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { user } = req;

		const tickets = await Ticket.findAll({
			where: { userId: user.id },
			include: [{ model: Event }],
		});

		return res.json({ tickets });
	})
);

router.delete(
	"/:ticketId",
	requireAuth,
	asyncHandler(async (req, res) => {
		const ticketId = req.params.ticketId;
		const { user } = req;

		await Ticket.destroy({
			where: { id: ticketId, userId: user.id },
		});
		return res.json({ message: "Ticket successfully deleted" });
	})
);

module.exports = router;
