import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Composer from "./Composer";
import Gates from "./Gates";
import Results from "./Results";
import Saved from "./Saved";

function App() {
	const [selectedGate, setSelectedGate] = React.useState("");

	return (
		<Wrapper>
			<Header />
			<Composer selectedGate={selectedGate} />
			<Gates selectedGate={selectedGate} setSelectedGate={setSelectedGate} />
			<Results />
			<Saved />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100vh;
	display: grid;
	grid-template-rows: 50px 4fr 3fr;
	grid-template-columns: repeat(4, 1fr);
	grid-template-areas:
		"header header header header"
		"composer composer composer gates"
		"results results saved saved";
	& > div {
		border: 1px solid var(--primary-light);
		background: var(--primary-dark);
	}
`;

export default App;
