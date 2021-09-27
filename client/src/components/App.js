import React from "react";
import styled from "styled-components";

import { AppContext } from "./AppContext";

import DisplayNameModal from "./DisplayNameModal";
import Header from "./Header";
import Composer from "./Composer";
import Gates from "./Gates";
import Results from "./Results";
import Saved from "./Saved";

import { calculateQuantumState } from "./../helpers";

const initialGateState = ["", "", "", "", "", "", "", "", "", ""];

function App() {
	const {
		enterDisplayName,
		signInWithGoogle,
		handleSignOut
	} = React.useContext(AppContext);

	const [q0Gates, setQ0Gates] = React.useState([...initialGateState]);
	const [q1Gates, setQ1Gates] = React.useState([...initialGateState]);
	const [selectedGate, setSelectedGate] = React.useState("");
	const [results, setResults] = React.useState([100, 0, 0, 0]);
	const [resultSource, setResultSource] = React.useState("Simulator");
	const [updateCircuits, setUpdateCircuits] = React.useState(true);

	React.useEffect(() => {
		//change onClick in QLine which sets other gates at same time with proper gate. OR, change the rendered gate in QLine to render C if gate is CX and X if otherGates[i] is CX
		if (resultSource === "Simulator") {
			setResults(calculateQuantumState(q0Gates, q1Gates));
		}
	}, [q0Gates, q1Gates]);

	React.useEffect(async () => {
		if (resultSource === "IBM Quantum Computer") {
			setResults(["...", "...", "...", "..."]);
			const ibmq = await fetch("/circuits/ibmq", {
				method: "post",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ q0: q0Gates, q1: q1Gates })
			});
			if (ibmq.status === 200) {
				const ibmqData = await ibmq.json();
				setResults([
					ibmqData["00"],
					ibmqData["01"],
					ibmqData["10"],
					ibmqData["11"]
				]);
			} else {
				setResults(["error", "error", "error", "error"]);
			}
		} else {
			setResults(calculateQuantumState(q0Gates, q1Gates));
		}
	}, [resultSource]);

	return (
		<>
			{enterDisplayName && <DisplayNameModal />}
			<Wrapper>
				<Header />
				<Composer
					initialGateState={initialGateState}
					q0Gates={q0Gates}
					setQ0Gates={setQ0Gates}
					q1Gates={q1Gates}
					setQ1Gates={setQ1Gates}
					selectedGate={selectedGate}
					setUpdateCircuits={setUpdateCircuits}
				/>
				<Gates selectedGate={selectedGate} setSelectedGate={setSelectedGate} />
				<Results
					results={results}
					resultSource={resultSource}
					setResultSource={setResultSource}
				/>
				<Saved
					setQ0Gates={setQ0Gates}
					setQ1Gates={setQ1Gates}
					updateCircuits={updateCircuits}
					setUpdateCircuits={setUpdateCircuits}
				/>
			</Wrapper>
		</>
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
