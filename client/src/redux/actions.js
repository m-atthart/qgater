export const circuitChanged = (circuit) => ({
	type: "circuitChanged",
	circuit
});

export const circuitSolved = (results) => ({
	type: "circuitSolved",
	results
});
