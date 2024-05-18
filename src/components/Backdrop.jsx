import React, { Children } from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
`;


const Backdrop = ({ open, style, children }) => {
    const backdropStyles = { ...style };
    return (
        <Wrapper style={backdropStyles} className={open ? "show" : "hide"} >
            {children}
        </Wrapper>
    )
}

export default Backdrop