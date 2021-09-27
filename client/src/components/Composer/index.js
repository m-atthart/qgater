import React from "react";
import styled from "styled-components";

import { AppContext } from "./../AppContext";

import SaveModal from "./SaveModal";
import QLine from "./QLine";

const Composer = ({
	initialGateState,
	q0Gates,
	setQ0Gates,
	q1Gates,
	setQ1Gates,
	selectedGate,
	setUpdateCircuits
}) => {
	const { displayName, userEmail } = React.useContext(AppContext);
	const [title, setTitle] = React.useState("");
	const [privacy, setPrivacy] = React.useState(false);
	const [displaySaveModal, setDisplaySaveModal] = React.useState(false);

	const handleSave = () => {
		fetch("/circuits/add", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title,
				displayName,
				email: userEmail,
				privacy,
				q0: q0Gates,
				q1: q1Gates
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 201) {
					setDisplaySaveModal(false);
					setUpdateCircuits((prev) => !prev);
				} else {
					return;
				}
			});
	};

	const handleReset = () => {
		setQ0Gates([...initialGateState]);
		setQ1Gates([...initialGateState]);
	};

	return (
		<>
			{displaySaveModal && (
				<SaveModal
					title={title}
					setTitle={setTitle}
					privacy={privacy}
					setPrivacy={setPrivacy}
					handleSave={handleSave}
					setDisplaySaveModal={setDisplaySaveModal}
				/>
			)}
			<Wrapper>
				<QLines>
					<div>
						<p>q0</p>
						<QLine
							gates={q0Gates}
							setGates={setQ0Gates}
							otherGates={q1Gates}
							setOtherGates={setQ1Gates}
							selectedGate={selectedGate}
						/>
					</div>
					<div>
						<p>q1</p>
						<QLine
							gates={q1Gates}
							setGates={setQ1Gates}
							otherGates={q0Gates}
							setOtherGates={setQ0Gates}
							selectedGate={selectedGate}
						/>
					</div>
				</QLines>
				<Buttons>
					<button
						disabled={!displayName}
						className={!displayName && "disabled"}
						onClick={() => setDisplaySaveModal(true)}
					>
						Save
					</button>
					<button onClick={handleReset}>Reset</button>
				</Buttons>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	grid-area: composer;
	& > h2 {
		position: absolute;
	}
`;

const QLines = styled.div`
	height: 75%;
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

const Buttons = styled.div`
	height: 25%;
	display: flex;
	justify-content: center;
	& > button {
		cursor: pointer;
		margin: 0 100px;
		width: 150px;
		height: 50px;
		background: var(--secondary);
		border: none;
		border-radius: 5px;
		font-size: 24px;
		&.disabled {
			filter: contrast(50%);
			cursor: auto;
		}
		&:not(.disabled):hover {
			background: var(--secondary-light);
		}
	}
`;

export default Composer;
