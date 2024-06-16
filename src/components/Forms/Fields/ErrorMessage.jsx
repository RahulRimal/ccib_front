import React from "react";
import styled, { useTheme } from "styled-components";

const ErrorWrapper = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.f14};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;

function ErrorMessage({ error }) {
  const theme = useTheme();
  return (
    <>
      <ErrorWrapper>{error}</ErrorWrapper>
    </>
  );
}

export default ErrorMessage;
