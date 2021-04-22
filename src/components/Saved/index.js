import React from "react";
import styled from "styled-components";

import { AppContext } from "./../AppContext";

import Circuit from "./Circuit";

const Saved = ({
	setQ0Gates,
	setQ1Gates,
	updateCircuits,
	setUpdateCircuits
}) => {
	const { userEmail } = React.useContext(AppContext);
	const [selectedTab, setSelectedTab] = React.useState("user");
	const [circuits, setCircuits] = React.useState([]);
	const [userCircuits, setUserCircuits] = React.useState([]);
	const [communityCircuits, setCommunityCircuits] = React.useState([]);

	React.useEffect(() => {
		if (selectedTab === "user") setCircuits(userCircuits);
		else if (selectedTab === "community") setCircuits(communityCircuits);
	}, [selectedTab, userCircuits, communityCircuits]);

	React.useEffect(() => {
		fetch(`/circuits?email=${userEmail}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 200) {
					console.log(json);
					setUserCircuits(json.userCircuits);
					setCommunityCircuits(json.communityCircuits);
				} else {
					return;
				}
			});
	}, [userEmail, updateCircuits]);

	return (
		<Wrapper>
			<Tabs>
				<Button
					className={selectedTab === "user" && "selected"}
					onClick={() => setSelectedTab("user")}
				>
					Your saved circuits
				</Button>
				<Button
					className={selectedTab === "community" && "selected"}
					onClick={() => setSelectedTab("community")}
				>
					Community Circuits
				</Button>
			</Tabs>
			<Circuits>
				{circuits.map((circuit) => (
					<Circuit
						userCircuit={selectedTab === "user"}
						circuit={circuit}
						setQ0Gates={setQ0Gates}
						setQ1Gates={setQ1Gates}
						setUpdateCircuits={setUpdateCircuits}
					/>
				))}
			</Circuits>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: saved;
	min-height: 0;
`;

const Tabs = styled.div`
	height: 50px;
`;
const Button = styled.button`
	cursor: pointer;
	height: 100%;
	width: 150px;
	background: var(--primary);
	border: 1px solid var(--primary-light);
	border-radius: 10px 10px 0 0;
	&.selected {
		cursor: auto;
		background: var(--secondary);
	}
	&:not(.selected):hover {
		background: var(--secondary-light);
	}
	&:focus {
		outline: none;
	}
`;
const Circuits = styled.div`
	height: calc(100% - 50px);
	border-top: 1px solid var(--primary-light);
	overflow-y: auto;
`;

export default Saved;
