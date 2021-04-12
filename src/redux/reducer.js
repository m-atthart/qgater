const initialState = {
	circuit: [
		["", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", ""]
	],
	results: [100, 0, 0, 0],
	status: "idle"
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "CIRCUIT_CHANGED": {
			return {
				...state,
				circuit: action.circuit,
				status: "loading"
			};
		}

		case "CIRCUIT_SOLVED": {
			return {
				...state,
				results: action.results,
				status: "idle"
			};
		}

		default: {
			return state;
		}
	}
}
