import React from "react";
import styled from "styled-components";

import QLine from "./QLine";

const Composer = ({ selectedGate }) => {
	const [q1Gates, setQ1Gates] = React.useState([
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		""
	]);
	const [q2Gates, setQ2Gates] = React.useState([
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		""
	]);

	const handleSolve = () => {
		return;
	};

	const handleReset = () => {
		setQ1Gates(["", "", "", "", "", "", "", "", "", ""]);
		setQ2Gates(["", "", "", "", "", "", "", "", "", ""]);
	};

	return (
		<Wrapper>
			<h2>Composer</h2>
			<QLines>
				<div>
					<p>q0</p>
					<QLine
						gates={q1Gates}
						setGates={setQ1Gates}
						selectedGate={selectedGate}
					/>
				</div>
				<div>
					<p>q1</p>
					<QLine
						gates={q2Gates}
						setGates={setQ2Gates}
						selectedGate={selectedGate}
					/>
				</div>
			</QLines>
			<Buttons>
				<button onClick={handleSolve}>Solve</button>
				<button onClick={handleReset}>Reset</button>
			</Buttons>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: composer;
	& > h2 {
		position: absolute;
	}
`;

const QLines = styled.div`
	height: 75%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	& > div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		& > p {
			color: var(--secondary-light);
			margin-right: 5px;
		}
	}
`;

const Buttons = styled.div`
	height: 25%;
	display: flex;
	justify-content: center;
	& > button {
		margin: 0 100px;
		width: 150px;
		height: 50px;
		background: var(--primary);
		border: 2px solid var(--secondary);
		border-radius: 5px;
		font-size: 24px;
		&:hover {
			background: var(--primary-light);
		}
	}
`;

export default Composer;
