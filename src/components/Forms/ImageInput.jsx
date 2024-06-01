import React, { useState } from "react";
import styled from "styled-components";
import CircleAvatar from "../CircleAvatar";

const ImageInputWrapper = styled.div`
  position: relative;
  width: ${({ theme }) => theme.sizing.s86};
  height: ${({ theme }) => theme.sizing.s86};

  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    border-radius: 50%;
  }
`;

function ImageInput() {
  const [image, setImage] = useState("https://picsum.photos/200");
  return (
    <ImageInputWrapper>
      <CircleAvatar url={image} style={{ height: "100%", width: "100%" }} />
      <input
        type="file"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
      />
    </ImageInputWrapper>
  );
}

export default ImageInput;
