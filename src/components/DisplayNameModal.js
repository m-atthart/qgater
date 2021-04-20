import React from "react";
import styled from "styled-components";

import { AppContext } from "./AppContext";

const DisplayNameModal = () => {
	const { displayName, setDisplayName, getDisplayName } = React.useContext(
		AppContext
	);

	return (
		<Wrapper>
			<Modal>
				<h2>Enter Display Name:</h2>
				<input
					value={displayName}
					onChange={({ target }) => setDisplayName(target.value)}
				/>
				<button onClick={getDisplayName}>Submit</button>
			</Modal>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(50, 50, 50, 0.7);
	display: grid;
	place-items: center;
	position: absolute;
	z-index: 5;
`;

const Modal = styled.div`
	width: 500px;
	height: 300px;
	border-radius: 15px;
	background: var(--primary-dark);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	h2 {
		font-size: 32px;
	}
	input {
		color: black;
		width: 200px;
		height: 40px;
		font-size: 22px;
		text-align: center;
	}
	button {
		cursor: pointer;
		margin: 0 100px;
		width: 120px;
		height: 45px;
		background: var(--secondary);
		border: none;
		border-radius: 5px;
		font-size: 24px;
		&:hover {
			background: var(--secondary-light);
		}
	}
`;

export default DisplayNameModal;
