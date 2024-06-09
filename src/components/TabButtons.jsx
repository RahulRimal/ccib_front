import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.s32};
`;

const ButtonWrapper = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  padding: ${({ theme }) => theme.spacing.s20} 0;
  &.active {
    color: ${({ theme }) => theme.palette.success.main};
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.success.main};
    }
  }
`;

function TabButtons({ formTabs = [], setTabs }) {
  const [tab, setTab] = useState(formTabs);

  const handleTab = (id) => {
    setTab(tab.map((item) => ({ ...item, active: item.id === id })));
  };

  useEffect(() => {
    setTabs(tab.filter((item) => item.active));
  }, [tab]);
  return (
    <Wrapper>
      {tab.map((item, index) => (
        <ButtonWrapper
          key={index}
          className={item.active ? "active" : ""}
          onClick={() => handleTab(item.id)}
        >
          {item.title}
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
}

export default TabButtons;
