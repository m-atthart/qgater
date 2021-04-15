export const matrixMultiply = (m1, m2) => {
	return m1.map((m1Row) => {
		const outputRow = [];
		for (let j = 0; j < m2[0].length; j++) {
			const m2Col = m2.map((m2Row) => m2Row[j]);
			const vals = m1Row.map((val, k) => val * m2Col[k]);
			outputRow.push(vals.reduce((acc, curr) => acc + curr, 0));
		}
		return outputRow;
	});
};

export const matrixTensor = (m1, m2) => {
	const outputArr = [];
	for (let k = 0; k < m1.length * m2.length; k++) outputArr.push([]);
	m1.forEach((m1Row, i) => {
		m1Row.forEach((m1Val, j) => {
			m2.forEach((m2Row, m) => {
				m2Row.forEach((m2Val, n) => {
					outputArr[i * m2.length + m].push(m1Val * m2Val);
				});
			});
		});
	});
	return outputArr;
};

const i = [
	[1, 0],
	[0, 1]
];

const x = [
	[0, 1],
	[1, 0]
];

const xteni = [
	[0, 0, 1, 0],
	[0, 0, 0, 1],
	[1, 0, 0, 0],
	[0, 1, 0, 0]
];
const itenx = [
	[0, 1, 0, 0],
	[1, 0, 0, 0],
	[0, 0, 0, 1],
	[0, 0, 1, 0]
];
const iteni = [
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1]
];
const xtenx = [
	[0, 0, 0, 1],
	[0, 0, 1, 0],
	[0, 1, 0, 0],
	[1, 0, 0, 0]
];
const z = [[1], [0], [0], [0]];
const o = [[0], [1], [0], [0]];
const t = [[0], [0], [1], [0]];
const h = [[0], [0], [0], [1]];

//console.log(matrixMultiply(matrixTensor(x, i), z));
//console.log(matrixMultiply(matrixTensor(x, i), o));
//console.log(matrixMultiply(matrixTensor(x, i), t));
//console.log(matrixMultiply(matrixTensor(x, i), h));
//console.log("\n");
//console.log(matrixMultiply(matrixTensor(i, x), z));
//console.log(matrixMultiply(matrixTensor(i, x), o));
//console.log(matrixMultiply(matrixTensor(i, x), t));
//console.log(matrixMultiply(matrixTensor(i, x), h));
//console.log("\n");
//console.log(matrixMultiply(matrixTensor(i, i), z));
//console.log(matrixMultiply(matrixTensor(i, i), o));
//console.log(matrixMultiply(matrixTensor(i, i), t));
//console.log(matrixMultiply(matrixTensor(i, i), h));
//console.log("\n");
//console.log(matrixMultiply(matrixTensor(x, x), z));
//console.log(matrixMultiply(matrixTensor(x, x), o));
//console.log(matrixMultiply(matrixTensor(x, x), t));
//console.log(matrixMultiply(matrixTensor(x, x), h));
