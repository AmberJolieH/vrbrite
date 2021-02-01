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
		<div className="event-card" >
			{/* <div className="event-page"> */}
				<div className="event-banner">
					<div className="event-banner__text">
						<h1>{eventName}</h1>
						<h4>{event.EventCategory.name}</h4>
					</div>
					<div className="event-banner__details">
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
											Get Ticket!
										</button>
									)}
						<p>
							<strong>In-World Location: </strong>
							<a href={event.location}> {event.name}</a>
						</p>{" "}

						<p>
							<strong>Date: </strong>{" "}
							{event.date}
						</p>

					</div>
				</div>
			{/* </div> */}
		</div>
		</Layout>
	);
};

export default EventPage;
