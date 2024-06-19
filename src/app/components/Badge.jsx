import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.primary};
    position: relative;

    & > span {
        position: absolute;
        top:0;
        right: -3px;
        background-color: ${({ theme }) => theme.palette.common.red};
        color: ${({ theme }) => theme.palette.common.white};
        border-radius: 100%;
        font-size: 12px;
        padding: 1px 5px;
    }

`;

const Badge = ({ badgeContent, children }) => {
    return (
        <Wrapper>
            {children}
            {badgeContent && <span >{badgeContent}</span>}
        </Wrapper>
    )
}

export default Badge
