import { fetch } from "./csrf";

const SET_SESSION_USER = "SET_SESSION_USER";
const REMOVE_SESSION_USER = "REMOVE_SESSION_USER";

const setSessionUser = (user) => {
	return {
		type: SET_SESSION_USER,
		payload: { user },
	};
};

const removeSessionUser = () => {
	return {
		type: REMOVE_SESSION_USER,
	};
};

//user sign-up
export const signup = (user) => async (dispatch) => {
	const { username, email, password } = user;
	const response = await fetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});
	dispatch(setSessionUser(response.data.user));
	return response;
};

//login user
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const res = await fetch("/api/session", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	dispatch(setSessionUser(res.data.user));
	return res;
};

//login demo
export const loginDemo = () => async (dispatch) => {
	const res = await fetch("/api/session/demo");
	dispatch(setSessionUser(res.data.user));
	return res;
};

//restore user session on page refresh
export const restoreUser = () => async (dispatch) => {
	const res = await fetch("/api/session");
	dispatch(setSessionUser(res.data.user));
	return res;
};

//set-up logout
export const logout = () => async (dispatch) => {
	const res = await fetch("/api/session", { method: "DELETE" });
	dispatch(removeSessionUser());
	return res;
};
//set initial state to have no user
const initialState = { user: null };

//set-up session reducer
const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SESSION_USER:
			return { ...state, user: action.payload.user };
		case REMOVE_SESSION_USER:
			return { ...state, user: null };
		default:
			return state;
	}
};

export default sessionReducer;
