import React from "react";
import styled from "styled-components";

import Circuit from "./Circuit";

const Saved = () => {
	const [selectedTab, setSelectedTab] = React.useState("user");
	const [circuits, setCircuits] = React.useState([]);
	const currentUser = "matt";

	React.useEffect(() => {
		setCircuits([
			{ user: "matt", circuit: "1" },
			{ user: "marie", circuit: "2" }
		]);
	}, []);

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
				{circuits
					.filter((circuit) =>
						selectedTab === "user" ? circuit.user === currentUser : true
					)
					.map((circuit) => (
						<Circuit circuit={circuit} />
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
