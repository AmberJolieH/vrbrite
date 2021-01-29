import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import MapDisplay from "../MapDisplay";
import * as ticketActions from "../../store/tickets";
import "./UserTickets.css";

const UserTickets = (props) => {
	const dispatch = useDispatch();
	const ticketState = useSelector((state) => state.tickets);

	useEffect(() => {
		dispatch(ticketActions.fetchTicketsIfNeeded());
	}, [dispatch]);

	const { isFetching, items: tickets, lastUpdated } = ticketState;

	if (isFetching && !lastUpdated) {
		return (
			<Layout>
				<div className="UserTickets">
					<h1>Tickets</h1>
					<p>Loading...</p>;
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="UserTickets">
				<h1>My Tickets</h1>
				{!!tickets.length ? (
					<ul
						style={isFetching ? { opacity: 0.7 } : {}}
						className="UserTickets__ticket-list"
					>
						{tickets.map((ticket) => (
							<li key={ticket.id}>
								<div className="ticket-card">
									<div className="ticket-card__map">
										<MapDisplay
											lat={ticket.Event.lat}
											long={ticket.Event.long}
										/>
									</div>
									<div className="ticket-card__details">
										<h2 className="ticket-event-name">
											{ticket.Event.name}
										</h2>
										<h4 className="date-ribbon">
											{new Date(
												ticket.Event.startsAt
											).toLocaleDateString(undefined, {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</h4>
										<div className="ticket-card__details__actions">
											<a
												href={ticket.Event.website}
												className="link-button"
											>
												Event website
											</a>
											{ticket.isDeleting ? (
												<button disabled>
													Deleting...
												</button>
											) : (
												<button
													onClick={() =>
														dispatch(
															ticketActions.deleteTicket(
																ticket.id
															)
														)
													}
													className="button button--danger"
												>
													Remove ticket
												</button>
											)}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<>
						<p>No tickets, yet</p>
						<p>
							Register for one from our{" "}
							<Link to="/events">events page</Link>!
						</p>
					</>
				)}
			</div>
		</Layout>
	);
};

export default UserTickets;
