import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Composer from "./Composer";
import Gates from "./Gates";
import Results from "./Results";
import Saved from "./Saved";

import { calculateQuantumState } from "./../helpers";

const initialGateState = ["", "", "", "", "", "", "", "", "", ""];

function App() {
	const [q0Gates, setQ0Gates] = React.useState([...initialGateState]);
	const [q1Gates, setQ1Gates] = React.useState([...initialGateState]);
	const [selectedGate, setSelectedGate] = React.useState("");
	const [results, setResults] = React.useState([100, 0, 0, 0]);

	React.useEffect(() => {
		setResults(calculateQuantumState(q0Gates, q1Gates));
	}, [q0Gates, q1Gates]);

	return (
		<Wrapper>
			<Header />
			<Composer
				initialGateState={initialGateState}
				q0Gates={q0Gates}
				setQ0Gates={setQ0Gates}
				q1Gates={q1Gates}
				setQ1Gates={setQ1Gates}
				selectedGate={selectedGate}
				setResults={setResults}
			/>
			<Gates selectedGate={selectedGate} setSelectedGate={setSelectedGate} />
			<Results results={results} />
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