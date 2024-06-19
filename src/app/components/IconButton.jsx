import React from 'react';
import styled from 'styled-components';

const IconButton = ({ type, onClick, onHover, showBgOnHover = true, children }) => {
  return (
    <Wrapper type={type} onMouseOver={onHover} onClick={onClick} showBgOnHover={showBgOnHover}  >
      {children}
    </Wrapper>
  )
}

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98


const Wrapper = styled.button`
cursor: pointer;
border: none;
background: none;
/* width: ${({ width }) => width || 'auto'}; */
/* height: ${({ height }) => height || 'auto'}; */

:hover {
  &:hover {
    background-color:  ${({ showBgOnHover, theme }) => showBgOnHover && theme.palette.primary.dark};
  }
  border-radius: 100%;
}

& > * {
  padding: 4px;
}
`;

export default IconButton