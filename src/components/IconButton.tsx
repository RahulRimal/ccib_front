import React from "react";
import styled from "styled-components";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onHover?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  showBgOnHover?: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  [key: string]: any;
};
const IconButton = ({
  type="button",
  onClick,
  onHover,
  showBgOnHover = true,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Wrapper
      type={type}
      {...props}
      onMouseOver={onHover}
      onClick={onClick}
      showBgOnHover={showBgOnHover}
    >
      {children}
    </Wrapper>
  );
};

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.button<{
  showBgOnHover: boolean;
  width?: string;
  height?: string;
}>`
  cursor: pointer;
  border: none;
  background: none;

  :hover {
    &:hover {
      background-color: ${({ showBgOnHover, theme }) =>
        showBgOnHover && theme.palette.primary.dark};
    }
    border-radius: 100%;
  }

  & > * {
    padding: 4px;
  }
`;

export default IconButton;
