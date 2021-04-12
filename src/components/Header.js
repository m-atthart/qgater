import React from "react";
import styled from "styled-components";

const Header = () => {
	return <Wrapper>Header</Wrapper>;
};

const Wrapper = styled.div`
	grid-area: header;
	display: grid;
	place-items: center;
`;

export default Header;
