import actionTypes from "./actionTypes";

export default function reducer(state, action) {
	switch (action.type) {
		case actionTypes.authenticate: {
			return {
				...state,
				isAuthenticated: true,
			};
		}
		case actionTypes.logout: {
			return {
				...state,
				isAuthenticated: false,
			};
		}
		default: {
			return state;
		}
	}
}
