import { matrixMultiply, matrixTensor } from "./linalg";

export const roundAccurately = (number, decimalPlaces) => {
	return Number(
		Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces
	);
};

const gates = {
	I: [
		[1, 0],
		[0, 1]
	],
	X: [
		[0, 1],
		[1, 0]
	],
	Z: [
		[1, 0],
		[0, -1]
	],
	H: [
		[0.7071, 0.7071],
		[0.7071, -0.7071]
	],
	Q0CX: [
		[1, 0, 0, 0],
		[0, 0, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 0, 0]
	],
	Q1CX: [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 1],
		[0, 0, 1, 0]
	],
	Q0CZ: [
		[1, 0, 0, 0],
		[0, -1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	],
	Q1CZ: [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, -1]
	],
	SW: [
		[1, 0, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 1]
	]
};

export const calculateQuantumState = (q0Gates, q1Gates) => {
	let output = [[1], [0], [0], [0]];
	q0Gates.forEach((q0Gate, i) => {
		const q1Gate = q1Gates[i];
		if (q0Gate === "CX") {
			output = matrixMultiply(gates["Q0CX"], output);
		} else if (q1Gate === "CX") {
			output = matrixMultiply(gates["Q1CX"], output);
		} else if (q0Gate === "CZ") {
			output = matrixMultiply(gates["Q0CZ"], output);
		} else if (q1Gate === "CZ") {
			output = matrixMultiply(gates["Q1CZ"], output);
		} else if (q0Gate === "SW" || q1Gate === "SW") {
			output = matrixMultiply(gates["SW"], output);
		} else {
			output = matrixMultiply(
				matrixTensor(gates[q1Gate] ?? gates["I"], gates[q0Gate] ?? gates["I"]),
				output
			);
		}
	});
	output = output.map((val) => val[0] * val[0]);
	return output;
};
