import React from "react";
import styled from "styled-components";

import QLine from "./QLine";

import { roundAccurately } from "./../../helpers";

const Composer = ({
	initialGateState,
	q0Gates,
	setQ0Gates,
	q1Gates,
	setQ1Gates,
	selectedGate,
	setResults
}) => {
	const handleSolve = () => {
		return;
	};

	const handleReset = () => {
		setQ0Gates([...initialGateState]);
		setQ1Gates([...initialGateState]);
	};

	React.useEffect(() => {
		setResults([
			roundAccurately(Math.random() * 100, 2),
			roundAccurately(Math.random() * 100, 2),
			roundAccurately(Math.random() * 100, 2),
			roundAccurately(Math.random() * 100, 2)
		]);
	}, [q0Gates, q1Gates]);

	return (
		<Wrapper>
			<h2>Composer</h2>
			<QLines>
				<div>
					<p>q0</p>
					<QLine
						gates={q0Gates}
						setGates={setQ0Gates}
						otherGates={q1Gates}
						selectedGate={selectedGate}
					/>
				</div>
				<div>
					<p>q1</p>
					<QLine
						gates={q1Gates}
						setGates={setQ1Gates}
						otherGates={q0Gates}
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
		cursor: pointer;
		margin: 0 100px;
		width: 150px;
		height: 50px;
		background: var(--secondary);
		border: none;
		border-radius: 5px;
		font-size: 24px;
		&:hover {
			background: var(--secondary-light);
		}
	}
`;

export default Composer;
