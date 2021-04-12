import React from "react";
import styled from "styled-components";

const Results = ({ results }) => {
	return (
		<Wrapper>
			<Output>00: {results[0]}%</Output>
			<Output>01: {results[1]}%</Output>
			<Output>10: {results[2]}%</Output>
			<Output>11: {results[3]}%</Output>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: results;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const Output = styled.div`
	font-size: 20px;
`;

export default Results;
