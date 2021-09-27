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
