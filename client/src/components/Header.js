import React from "react";
import styled from "styled-components";

import { AppContext } from "./AppContext";

const Header = () => {
	const {
		displayName,
		enterDisplayName,
		signInWithGoogle,
		handleSignOut
	} = React.useContext(AppContext);

	return (
		<Wrapper>
			<h1>Cirqit</h1>
			{!displayName && <button onClick={signInWithGoogle}>Sign In</button>}
			{displayName && !enterDisplayName && (
				<>
					<span>
						<h2>Hi, {displayName}</h2>
					</span>
					<SignOut onClick={handleSignOut}>Sign Out</SignOut>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	grid-area: header;
	display: flex;
	align-items: center;
	justify-content: space-between;
	h1,
	h2 {
		user-select: none;
	}
	h1 {
		padding: 0 15px;
		font-size: 22px;
	}
	span {
		height: 101%;
		width: 150px;
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		&:hover + button {
			z-index: 10;
		}
	}
	button {
		width: 120px;
		height: 50px;
		background: var(--primary);
		border: 1px solid var(--primary-light);
		outline: none;
		font-size: 20px;
		cursor: pointer;
		&:hover {
			background: var(--primary-light);
		}
	}
`;

const SignOut = styled.button`
	position: absolute;
	top: 50px;
	right: 0;
	z-index: -1;
	&:hover {
		z-index: 10;
	}
`;

export default Header;
