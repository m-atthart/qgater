import React from "react";
import styled from "styled-components";

const Results = ({ results, resultSource, setResultSource }) => {
	return (
		<Wrapper>
			<span>
				<h2>Results from: {resultSource}</h2>
				<button
					onClick={() =>
						setResultSource((prev) =>
							prev === "Simulator" ? "IBM Quantum Computer" : "Simulator"
						)
					}
				>
					Run on
					{resultSource === "Simulator"
						? " IBM Quantum Computer"
						: " Simulator"}
				</button>
			</span>
			<Output>00: {results[0] * 100}%</Output>
			<Output>01: {results[1] * 100}%</Output>
			<Output>10: {results[2] * 100}%</Output>
			<Output>11: {results[3] * 100}%</Output>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: results;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	& > span {
		display: flex;
		flex-direction: column;
		align-items: center;
		& > button {
			background: none;
			border: none;
			cursor: pointer;
			color: var(--secondary-light);
		}
	}
`;

const Output = styled.div`
	font-size: 20px;
`;

export default Results;
