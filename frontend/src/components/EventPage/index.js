import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import MapDisplay from "../MapDisplay";
import DefaultDescription from "./DefaultDescription";
import EventImage from "../EventImage";
import * as eventActions from "../../store/events";
import * as ticketActions from "../../store/tickets";
import "./EventPage.css";

const EventPage = (props) => {
	const eventId = props.match.params.eventId;
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const eventsById = useSelector((state) => state.events.byId);
	const ticketState = useSelector((state) => state.tickets);

	useEffect(() => {
		dispatch(ticketActions.fetchTicketsIfNeeded());
	}, [dispatch, ticketState]);

	useEffect(() => {
		dispatch(eventActions.fetchEventIfNeeded(eventId));
	}, [dispatch, eventsById, eventId]);

	const { isFetching: isFetchingEvent, body: event } = eventsById[
		eventId
	] || {
		isFetching: true,
		body: {},
	};

	const {
		isFetching: isFetchingTickets,
		items: tickets,
		isAdding: isAddingTicket,
	} = ticketState;

	if (isFetchingEvent || isFetchingTickets) {
		return (
			<Layout>
				<p>Loading...</p>
			</Layout>
		);
	}

	const eventTicket = tickets.find(
		(ticket) => ticket.eventId === parseInt(eventId, 10)
	);

	const eventName =
		event.name.length > 68 ? `${event.name.slice(0, 65)}...` : event.name;

	return (
		<Layout>
			<div className="event-page">
				<div className="event-banner">
					<div className="event-banner__text">
						<h1>{eventName}</h1>
						<h4>{event.EventCategory.name}</h4>
					</div>
					<EventImage
						name={event.EventCategory.name}
						className="event-banner__image"
					/>
				</div>
				<div className="event-details">
					<div className="event-details__description">
						<strong>Description</strong>
						{!!event.description ? (
							<p>{event.description}</p>
						) : (
							<DefaultDescription />
						)}
					</div>
					<div className="event-details__details">
						{!user ? (
							"Login to register for events"
						) : !!eventTicket ? (
							eventTicket.isDeleting ? (
								<button disabled>Deleting...</button>
							) : (
								<button
									className="button button--danger"
									onClick={() =>
										dispatch(
											ticketActions.deleteTicket(
												eventTicket.id
											)
										)
									}
								>
									Remove ticket
								</button>
							)
						) : isAddingTicket ? (
							<button className="button" disabled>
								Adding...
							</button>
						) : (
							<button
								className="button"
								onClick={() =>
									dispatch(ticketActions.addTicket(eventId))
								}
							>
								Get Ticket
							</button>
						)}
						<p>
							<strong>State</strong> {event.state}
						</p>{" "}
						{!!event.website && (
							<p>
								<strong>Website</strong>{" "}
								{
									<a
										target="_blank"
										href={event.website}
										rel="noreferrer"
									>
										{event.website}
									</a>
								}
							</p>
						)}
						<p>
							<strong>Start Date</strong>{" "}
							{new Date(event.startsAt).toLocaleDateString(
								undefined,
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</p>
						<p>
							<strong>End Date</strong>{" "}
							{new Date(event.endsAt).toLocaleDateString(
								undefined,
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</p>
						<MapDisplay lat={event.lat} long={event.long} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default EventPage;
