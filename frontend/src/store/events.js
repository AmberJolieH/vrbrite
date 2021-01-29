import { fetch } from "./csrf";
import { combineReducers } from "redux";
import { RECEIVE_CATEGORIES } from "./categories";

export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const SELECT_EVENTCATEGORYID = "SELECT_EVENTCATEGORYID";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REQUEST_EVENT = "REQUEST_EVENT";

//all events
export const selectEventCategoryId = (eventCategoryId) => ({
	type: SELECT_EVENTCATEGORYID,
	payload: { eventCategoryId },
});

export const requestEvents = (eventCategoryId) => ({
	type: REQUEST_EVENTS,
	payload: { eventCategoryId },
});

export const receiveEvents = (eventCategoryId, data) => ({
	type: RECEIVE_EVENTS,
	payload: { eventCategoryId, events: data.events, receivedAt: Date.now() },
});

const fetchEvents = (eventCategoryId) => (dispatch) => {
	dispatch(requestEvents(eventCategoryId));
	return fetch(`/api/events?eventCategoryId=${eventCategoryId}`).then((res) =>
		dispatch(receiveEvents(eventCategoryId, res.data))
	);
};

const shouldFetchEvents = (state, eventCategoryId) => {
	const events = state.events.eventsByEventCategoryId[eventCategoryId];
	if (!events) {
		return true;
	}
	if (events.isFetching) {
		return false;
	}
	return true;
};

export const fetchEventsIfNeeded = (eventCategoryId) => (
	dispatch,
	getState
) => {
	if (shouldFetchEvents(getState(), eventCategoryId)) {
		return dispatch(fetchEvents(eventCategoryId));
	}
};

//for single event page
export const requestEvent = (eventId) => ({
	type: REQUEST_EVENT,
	payload: { eventId },
});

export const receiveEvent = (eventId, data) => ({
	type: RECEIVE_EVENT,
	payload: { eventId, event: data.event, receivedAt: Date.now() },
});

const fetchEvent = (eventId) => (dispatch) => {
	dispatch(requestEvent(eventId));
	return fetch(`/api/events/${eventId}`).then((res) =>
		dispatch(receiveEvent(eventId, res.data))
	);
};

const shouldFetchEvent = (state, eventId) => {
	const event = state.events.byId[eventId];
	if (!event) {
		return true;
	}
	if (event.isFetching) {
		return false;
	}
	return false;
};

export const fetchEventIfNeeded = (eventId) => (dispatch, getState) => {
	if (shouldFetchEvent(getState(), eventId)) {
		return dispatch(fetchEvent(eventId));
	}
};

//reducers
const selectedEventCategoryId = (state = "", action) => {
	switch (action.type) {
		case SELECT_EVENTCATEGORYID:
			return action.payload.eventCategoryId;
		case RECEIVE_CATEGORIES:
			return action.payload.categories[0].id;
		default:
			return state;
	}
};

const events = (
	state = {
		isFetching: false,
		items: [],
	},
	action
) => {
	switch (action.type) {
		case REQUEST_EVENTS:
			return {
				...state,
				isFetching: true,
			};
		case RECEIVE_EVENTS:
			return {
				...state,
				isFetching: false,
				items: action.payload.events,
				lastUpdated: action.payload.receivedAt,
			};
		default:
			return state;
	}
};

const eventsByEventCategoryId = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_EVENTS:
		case REQUEST_EVENTS:
			return {
				...state,
				[action.payload.eventCategoryId]: events(
					state[action.payload.eventCategoryId],
					action
				),
			};
		default:
			return state;
	}
};

const event = (
	state = {
		isFetching: false,
		body: {},
	},
	action
) => {
	switch (action.type) {
		case REQUEST_EVENT:
			return {
				...state,
				isFetching: true,
			};
		case RECEIVE_EVENT:
			return {
				...state,
				isFetching: false,
				body: action.payload.event,
				lastUpdated: action.payload.receivedAt,
			};
		default:
			return state;
	}
};

const byId = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_EVENT:
		case REQUEST_EVENT:
			return {
				...state,
				[action.payload.eventId]: event(
					state[action.payload.eventId],
					action
				),
			};
		default:
			return state;
	}
};

const eventsReducer = combineReducers({
	eventsByEventCategoryId,
	selectedEventCategoryId,
	byId,
});

export default eventsReducer;
