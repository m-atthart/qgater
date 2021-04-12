import React from "react";
import styled from "styled-components";

const Gates = ({ selectedGate, setSelectedGate }) => {
	const availableGates = ["S0", "S1", "I", "X", "Z", "H", "CX", "CZ", "SW"];

	return (
		<Wrapper>
			<h2>Gates</h2>
			{/* add tooltip click to select. click on the line to place. click again to remove */}
			{availableGates.map((gate) => (
				<Gate
					key={gate}
					className={gate === selectedGate && "selected"}
					onClick={() => setSelectedGate(gate)}
				>
					<p>{gate}</p>
				</Gate>
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: gates;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
	grid-gap: 20px;
	position: relative;
	& > h2 {
		top: 0;
		left: 0;
		position: absolute;
	}
`;

const Gate = styled.div`
	display: grid;
	place-items: center;
	width: 50px;
	height: 50px;
	background: var(--primary);
	cursor: pointer;
	&.selected {
		border: 3px solid var(--secondary-light);
	}
	&:hover {
		background: var(--secondary-light);
	}
	p {
		font-size: 24px;
		user-select: none;
	}
`;

export default Gates;
