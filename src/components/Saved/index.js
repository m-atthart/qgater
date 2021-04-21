import React from "react";
import styled from "styled-components";

import { AppContext } from "./../AppContext";

import Circuit from "./Circuit";

const Saved = ({ setQ0Gates, setQ1Gates }) => {
	const { userEmail } = React.useContext(AppContext);
	const [selectedTab, setSelectedTab] = React.useState("user");
	const [circuits, setCircuits] = React.useState([]);
	const [privateCircuits, setPrivateCircuits] = React.useState([]);
	const [publicCircuits, setPublicCircuits] = React.useState([]);

	React.useEffect(() => {
		if (selectedTab === "user") setCircuits(privateCircuits);
		else if (selectedTab === "community") setCircuits(publicCircuits);
	}, [selectedTab, privateCircuits, publicCircuits]);

	React.useEffect(() => {
		fetch(`/circuits?email=${userEmail}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 200) {
					console.log(json);
					setPrivateCircuits(json.privateCircuits);
					setPublicCircuits(json.publicCircuits);
				} else {
					return;
				}
			});
	}, [userEmail]);

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
						circuit={circuit}
						setQ0Gates={setQ0Gates}
						setQ1Gates={setQ1Gates}
					/>
				))}
			</Circuits>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: saved;
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
	border-top: 1px solid var(--primary-light);
`;

export default Saved;
