import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
border: 3px solid ${({theme})=>theme.palette.primary.main}; 
`;

const CircleAvatar = ({ url, alt, style }) => {
    const imageStyle = { ...style }
    return (
        <Image src={url} style={imageStyle} alt={alt} />
    )
}

export default CircleAvatar