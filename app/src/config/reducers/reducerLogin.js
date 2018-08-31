import { CHANGE_TOKEN } from "../actions/login";

const initialState = {
	token: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_TOKEN:
			return {
				...state,
				token: action.token
			};
		default:
			return state;
	}
};
