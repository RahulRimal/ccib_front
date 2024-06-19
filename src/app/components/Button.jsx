import React from "react";
import styled from "styled-components";

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const ButtonWrapper = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.input};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.disabled.button : theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.3s ease;
`;

const Button = ({ icon, isSubmitting, text, onClick, disabled, type, style }) => {
  const buttonStyle = { ...style };
  return (
    <ButtonWrapper  type={type} disabled={disabled} style={buttonStyle} onClick={onClick}>
      {isSubmitting ? (
        "Submitting..."
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {text}
        </>
      )}
    </ButtonWrapper>
  );
};

export default Button;
