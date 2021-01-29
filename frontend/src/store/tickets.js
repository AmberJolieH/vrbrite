import { fetch } from "./csrf";

export const RECEIVE_TICKETS = "RECEIVE_TICKETS";
export const REQUEST_TICKETS = "REQUEST_TICKETS";
export const RESET_TICKETS = "RESET_TICKETS";
export const ADD_TICKET_REQUEST = "ADD_TICKET_REQUEST";
export const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS ";
export const DELETE_TICKET_REQUEST = "DELETE_TICKET_REQUEST";
export const DELETE_TICKET_SUCCESS = "DELETE_TICKET_SUCCESS";

const addTicketRequest = () => ({
	type: ADD_TICKET_REQUEST,
});

const addTicketSuccess = (data) => ({
	type: ADD_TICKET_SUCCESS,
	payload: { ticket: data.ticket, receivedAt: Date.now() },
});

export const addTicket = (eventId) => (dispatch) => {
	dispatch(addTicketRequest());
	return fetch(`/api/events/${eventId}/ticket`, {
		method: "POST",
	}).then((res) => dispatch(addTicketSuccess(res.data)));
};

export const requestTickets = () => ({
	type: REQUEST_TICKETS,
});

export const resetTickets = () => ({
	type: RESET_TICKETS,
});

export const receiveTickets = (data) => ({
	type: RECEIVE_TICKETS,
	payload: { tickets: data.tickets, receivedAt: Date.now() },
});

const fetchTickets = () => (dispatch) => {
	dispatch(requestTickets());
	return fetch(`/api/tickets`).then((res) =>
		dispatch(receiveTickets(res.data))
	);
};

const shouldFetchTickets = (state) => {
	const tickets = state.tickets;
	const user = state.session.user;
	if (!user) {
		return false;
	}
	if (!tickets) {
		return true;
	}
	if (tickets.isFetching) {
		return false;
	}
	if (!tickets.lastUpdated) {
		return true;
	}
	return tickets.needsReset;
};

export const fetchTicketsIfNeeded = () => (dispatch, getState) => {
	if (shouldFetchTickets(getState())) {
		return dispatch(fetchTickets());
	}
};

const deleteTicketRequest = (ticketId) => ({
	type: DELETE_TICKET_REQUEST,
	payload: { ticketId },
});

const deleteTicketSuccess = (ticketId) => ({
	type: DELETE_TICKET_SUCCESS,
	payload: { ticketId, receivedAt: Date.now() },
});

export const deleteTicket = (ticketId) => (dispatch) => {
	dispatch(deleteTicketRequest(ticketId));
	return fetch(`/api/tickets/${ticketId}`, {
		method: "DELETE",
	}).then(() => dispatch(deleteTicketSuccess(ticketId)));
};

const ticketsReducer = (
	state = {
		isFetching: false,
		needsReset: false,
		items: [],
		isAdding: false,
	},
	action
) => {
	switch (action.type) {
		case ADD_TICKET_REQUEST:
			return {
				...state,
				isAdding: true,
			};
		case ADD_TICKET_SUCCESS:
			return {
				...state,
				isAdding: false,
				items: [...state.items, action.payload.ticket],
				lastUpdated: action.payload.receivedAt,
			};
		case RECEIVE_TICKETS:
			return {
				...state,
				isFetching: false,
				needsReset: false,
				items: action.payload.tickets,
				lastUpdated: action.payload.receivedAt,
			};
		case REQUEST_TICKETS:
			return { ...state, needsReset: false, isFetching: true };
		case RESET_TICKETS:
			return { ...state, needsReset: true };
		case DELETE_TICKET_REQUEST:
			return {
				...state,
				items: state.items.map((ticket) =>
					ticket.id === action.payload.ticketId
						? { ...ticket, isDeleting: true }
						: ticket
				),
			};
		case DELETE_TICKET_SUCCESS:
			return {
				...state,
				items: state.items.filter(
					(ticket) => ticket.id !== action.payload.ticketId
				),
			};
		default:
			return state;
	}
};

export default ticketsReducer;
