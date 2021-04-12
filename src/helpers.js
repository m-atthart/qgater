export const roundAccurately = (number, decimalPlaces) =>
	Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);
