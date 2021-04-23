import React from "react";
import styled from "styled-components";

const Results = ({ results, resultSource, setResultSource }) => {
	const [resultValues, setResultValues] = React.useState(results);

	React.useEffect(() => {
		setResultValues(
			results.map((result) => {
				console.log(typeof result);
				if (typeof result === "number") {
					return `${result * 100}%`;
				}
				return result;
			})
		);
	}, [results]);

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
			<Output>00: {resultValues[0]}</Output>
			<Output>01: {resultValues[1]}</Output>
			<Output>10: {resultValues[2]}</Output>
			<Output>11: {resultValues[3]}</Output>
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
