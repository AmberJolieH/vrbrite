import { fetch } from "./csrf";

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receiveCategories = (data) => ({
	type: RECEIVE_CATEGORIES,
	payload: { categories: data.categories },
});

const fetchCategories = () => (dispatch) => {
	return fetch(`/api/categories`).then((res) =>
		dispatch(receiveCategories(res.data))
	);
};

const shouldFetchCategories = (state) => {
	const categories = state.categories;
	return !categories || !categories.length;
};

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
	if (shouldFetchCategories(getState())) {
		return dispatch(fetchCategories());
	}
};

const categoryReducer = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			return action.payload.categories;
		default:
			return state;
	}
};

export default categoryReducer;
