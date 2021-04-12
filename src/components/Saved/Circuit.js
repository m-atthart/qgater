import React from "react";
import styled from "styled-components";

const Circuit = ({ circuit }) => {
	return (
		<Wrapper>
			{circuit.user}
			{circuit.circuit}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid var(--primary-light);
	height: 90px;
`;

export default Circuit;
