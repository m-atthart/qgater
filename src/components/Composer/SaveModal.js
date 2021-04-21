import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const SaveModal = ({
	title,
	setTitle,
	privacy,
	setPrivacy,
	handleSave,
	setDisplaySaveModal
}) => {
	return (
		<Wrapper>
			<Modal>
				<AiOutlineClose onClick={() => setDisplaySaveModal(false)} />
				<div>
					<h2>Title:</h2>
					<input
						type="text"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					></input>
				</div>
				<div>
					<h2>Private:</h2>
					<input
						type="checkbox"
						defaultChecked={privacy}
						onChange={() => setPrivacy((prev) => !prev)}
					></input>
				</div>
				<button onClick={handleSave}>Save</button>
			</Modal>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(50, 50, 50, 0.7) !important;
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
	padding: 20px 0 5px;
	position: relative;
	& > svg {
		cursor: pointer;
		position: absolute;
		font-size: 20px;
		top: 20px;
		right: 20px;
	}
	& > div {
		display: flex;
		align-items: center;
	}
	input {
		margin-left: 15px;
	}
	h2 {
		font-size: 24px;
	}
	input[type="text"] {
		color: black;
		width: 325px;
		height: 35px;
		font-size: 22px;
		text-align: center;
	}
	input[type="checkbox"] {
		width: 18px;
		height: 18px;
	}
	button {
		cursor: pointer;
		margin: 0 100px;
		width: 110px;
		height: 40px;
		background: var(--secondary);
		border: none;
		border-radius: 5px;
		font-size: 22px;
		&:hover {
			background: var(--secondary-light);
		}
	}
`;

export default SaveModal;
