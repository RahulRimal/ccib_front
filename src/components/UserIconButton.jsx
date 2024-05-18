import React from "react";
import styled from "styled-components";

const IconButtonWrapper = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.f30};
  cursor: pointer;
  background: ${({ theme }) => theme.palette.background.dark};
  width: ${({ width }) => width || "50px"};
  height: ${({ height }) => height || "50px"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;

function UserIconButton({
  type,
  onClick,
  onHover,
  showBgOnHover = true,
  children,
}) {
  return (
    <IconButtonWrapper
      type={type}
      onMouseOver={onHover}
      onClick={onClick}
      showBgOnHover={showBgOnHover}
    >
      {children}
    </IconButtonWrapper>
  );
}

export default UserIconButton;
