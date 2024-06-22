"use client";

import Button from "@/app/components/Button";
import React from "react";
import { IoChevronDownSharp, IoSearchCircleOutline } from "react-icons/io5";
import styled, { useTheme } from "styled-components";

const HeaderWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.s0} ${theme.spacing.s12}`};
  background-color: ${({ theme }) => theme.palette.info.main};
  position: sticky;
  z-index: 999;
  top: 0;
  & > div {
    height: ${({ theme }) => theme.sizing.s52};
    display: flex;
    align-items: center;
    width: 90%;
    margin: auto;
  }
  button {
    background-color: transparent;
  }
`;

const Header = () => {
  const theme = useTheme();
  return (
    <HeaderWrapper>
      <div>
        <h2 style={{ color: theme.palette.text.white }}>CCIC</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: theme.spacing.s12,
            width: "100%",
          }}
        >
          <Button
            text={"CCIC user"}
            style={{ fontSize: theme.typography.fontSize.f8 }}
            icon={<IoChevronDownSharp className="icon" />}
          />
          <Button
            text={"CCIC user"}
            style={{ fontSize: theme.typography.fontSize.f8 }}
            icon={<IoChevronDownSharp className="icon" />}
          />
          <Button
            style={{ padding: `${theme.spacing.s0} ${theme.spacing.s8}` }}
            icon={
              <IoSearchCircleOutline
                className="icon"
                style={{ fontSize: theme.typography.fontSize.f24 }}
              />
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: theme.spacing.s8,
            width: theme.sizing.s256,
          }}
        >
          <Button text={"Login"} />
          <Button
            text={"Sign Up"}
            style={{ backgroundColor: theme.palette.primary.main }}
          />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
