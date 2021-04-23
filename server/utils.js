const timeout = (s) => {
	return new Promise((res) => setTimeout(res, s * 1000));
};

const qobjify = (q0, q1) => {
	const qobj = {
		qobj_id: "CirQit",
		type: "QASM",
		schema_version: "1.3.0",
		experiments: [
			{
				header: {
					description: "Circuit created on CirQit"
				},
				config: {},
				instructions: []
			}
		],
		header: {
			description: "CirQit Circuit"
		},
		config: {
			shots: 256,
			memory_slots: 2
		}
	};

	const gateKeys = {
		I: "id",
		H: "h",
		X: "x",
		Z: "z"
	};
	const ins = qobj.experiments[0].instructions;

	q0.forEach((q0Gate, i) => {
		const q1Gate = q1[i];
		if (q0Gate === "CX") ins.push({ name: "cx", qubits: [0, 1] });
		else if (q1Gate === "CX") ins.push({ name: "cx", qubits: [1, 0] });
		else if (q0Gate === "CZ") ins.push({ name: "cz", qubits: [0, 1] });
		else if (q1Gate === "CZ") ins.push({ name: "cz", qubits: [1, 0] });
		else if (q0Gate === "SW" || q1Gate === "SW")
			ins.push({ name: "swap", qubits: [0, 1] });
		else {
			if (q0Gate) ins.push({ name: gateKeys[q0Gate], qubits: [0] });
			if (q1Gate) ins.push({ name: gateKeys[q1Gate], qubits: [1] });
		}
	});

	ins.push({ name: "measure", qubits: [0, 1], memory: [0, 1] });

	return qobj;
};

module.exports = {
	timeout,
	qobjify
};
