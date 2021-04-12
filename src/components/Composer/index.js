import React from "react";
import styled from "styled-components";

import QLine from "./QLine";

const Composer = ({ selectedGate }) => {
	return (
		<Wrapper>
			<h2>Composer</h2>
			<QLines>
				<div>
					<p>q0</p>
					<QLine selectedGate={selectedGate} />
				</div>
				<div>
					<p>q1</p>
					<QLine selectedGate={selectedGate} />
				</div>
			</QLines>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: composer;
	background: var(--primary-dark);
	& > h2 {
		color: white;
		position: absolute;
	}
`;

const QLines = styled.div`
	height: 100%;
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

export default Composer;
