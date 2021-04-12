import React from "react";
import styled from "styled-components";

const QLine = ({ selectedGate }) => {
	const [gates, setGates] = React.useState([
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

	const updateGate = (idx) => {
		setGates((prev) => {
			const lst = [...prev];
			if (gates[idx]) {
				lst.splice(idx, 1, ""); //if there's a gate, remove it
			} else {
				lst.splice(idx, 1, selectedGate);
			}
			return lst;
		});
	};

	return (
		<Wrapper>
			{gates.map((gate, i) => (
				<Gate key={i} className={gate || "none"} onClick={() => updateGate(i)}>
					<p>{gate}</p>
				</Gate>
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 75%;
	height: 0;
	border: 1px solid var(--secondary);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const Gate = styled.div`
	display: grid;
	place-items: center;
	width: 50px;
	height: 50px;
	background: var(--primary);
	cursor: pointer;
	&.none {
		background: none;
	}
	&:hover {
		background: var(--primary-light);
	}
	p {
		font-size: 24px;
		user-select: none;
	}
`;

export default QLine;
