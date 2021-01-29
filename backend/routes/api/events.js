const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { User, Event, EventCategory, Ticket } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const eventCategoryId = req.query.eventCategoryId;

		const events = !!eventCategoryId
			? await Event.findAll({
					where: { eventCategoryId },
					include: [{ model: EventCategory }],
					order: [["name", "ASC"]],
			  })
			: await Event.findAll({
					include: [{ model: EventCategory }],
					order: [["name", "ASC"]],
			  });

		return res.json({ events });
	})
);

router.get(
	"/:eventId",
	asyncHandler(async (req, res) => {
		const eventId = req.params.eventId;

		const event = await Event.findOne({
			where: { id: eventId },
			include: [{ model: EventCategory }],
		});

		return res.json({ event });
	})
);

router.post(
	"/:eventId/ticket",
	requireAuth,
	asyncHandler(async (req, res) => {
		const { user } = req;
		const eventId = req.params.eventId;
		const newTicket = await Ticket.create({
			userId: user.id,
			eventId,
		});
		const ticket = await Ticket.findOne({
			where: { id: newTicket.id },
			include: [{ model: Event }],
		});

		return res.json({ ticket });
	})
);

module.exports = router;
