import React from "react";
import styled from "styled-components";

const Circuit = ({ circuit, setQ0Gates, setQ1Gates }) => {
	const { title, displayName, q0, q1 } = circuit;

	const handleClick = () => {
		setQ0Gates(q0);
		setQ1Gates(q1);
	};

	return (
		<Wrapper onClick={handleClick}>
			<h3>{title}</h3>
			<p>Created by: {displayName}</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid var(--primary-light);
	height: 90px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 0 15px;
	h3,
	p {
		user-select: none;
	}
	h3 {
		font-size: 20px;
	}
	p {
		font-size: 16px;
		color: #ccc;
	}
`;

export default Circuit;
