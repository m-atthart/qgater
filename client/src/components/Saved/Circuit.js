import React from "react";
import styled from "styled-components";

import { RiDeleteBinLine } from "react-icons/ri";

const Circuit = ({
	userCircuit,
	circuit,
	setQ0Gates,
	setQ1Gates,
	setUpdateCircuits
}) => {
	const { title, displayName, privacy, q0, q1 } = circuit;

	const handleClick = () => {
		setQ0Gates(q0);
		setQ1Gates(q1);
	};

	const handleDelete = () => {
		fetch("/circuits/delete", {
			method: "delete",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: circuit.id
			})
		})
			.then((res) => res.json())
			.then((json) => {
				setUpdateCircuits((prev) => !prev);
			});
	};

	return (
		<Wrapper onClick={handleClick}>
			<h3>{title}</h3>
			<p>
				Created by: {userCircuit ? "You" : displayName} {privacy && "(private)"}
			</p>
			{userCircuit && <RiDeleteBinLine onClick={handleDelete} />}
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
	position: relative;
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
	svg {
		position: absolute;
		right: 30px;
		color: var(--secondary);
		height: 35px;
		width: 35px;
		padding: 5px;
		&:hover {
			color: var(--secondary-light);
		}
	}
`;

export default Circuit;
