import React from "react";
import styled, { useTheme } from "styled-components";

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const Wrapper = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s12};
  font-size: ${({ theme }) => theme.typography.fontSize.f24};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.background.dark};
  }
`;

const ListItem = ({ prefix, text, onClick, suffix }) => {
  const theme = useTheme();
  return (
    <Wrapper onClick={onClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.s16,
        }}
      >
        {prefix}
        <span
          style={{
            fontSize: theme.sizing.s16,
            fontWeight: theme.typography.fontWeight.semiBold,
          }}
        >
          {text}
        </span>
      </div>
      <div style={{ fontSize: theme.typography.fontSize.f16 }}>
        {suffix && suffix}
      </div>
    </Wrapper>
  );
};

export default ListItem;
