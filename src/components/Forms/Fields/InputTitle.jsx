import React from "react";
import styled from "styled-components";

const Wrapper = styled.p`
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  font-size: ${({ theme }) => theme.typography.fontSize.f14};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.palette.primary.main};
  display: inline-block;
  position: relative;
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.f18};
    color: ${({ theme }) => theme.palette.error.main};
    position: absolute;
    padding-left: ${({ theme }) => theme.spacing.s4};
    left: 100%;
  }
`;

function InputTitle({ title, required }) {
  return (
    <Wrapper>
      {title} {required && <span>*</span>}
    </Wrapper>
  );
}

export default InputTitle;
