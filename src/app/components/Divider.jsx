import React from 'react'
import styled from 'styled-components'

const Divider = styled.hr`
width: 100%;
border: ${({ thickness, color, theme }) => `${thickness ? `${thickness}` : '-0.1px'} solid ${color ? color : theme.palette.border.primary}`};
`;

export default Divider