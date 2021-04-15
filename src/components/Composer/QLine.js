import React from "react";
import styled from "styled-components";

const QLine = ({ gates, setGates, otherGates, selectedGate }) => {
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
				<Gate
					key={i}
					className={`${gate || "none"} ${
						(["CX", "CZ", "SW"].includes(otherGates[i]) ||
							(otherGates[i] && ["CX", "CZ", "SW"].includes(selectedGate))) &&
						"disabled"
					}`}
					onClick={() => updateGate(i)}
					disabled={
						["CX", "CZ", "SW"].includes(otherGates[i]) ||
						(otherGates[i] && ["CX", "CZ", "SW"].includes(selectedGate))
					}
				>
					{gate}
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

const Gate = styled.button`
	outline: none;
	border: none;
	width: 50px;
	height: 50px;
	background: var(--primary);
	cursor: pointer;
	font-size: 24px;
	&.none {
		background: none;
	}
	&.disabled {
		cursor: auto;
	}
	&:not(.disabled):hover {
		background: var(--primary-light);
	}
`;

export default QLine;
