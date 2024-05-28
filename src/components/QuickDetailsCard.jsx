import React from "react";
import styled, { useTheme } from "styled-components";
import { VscDebugAll } from "react-icons/vsc";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { ImStatsBars } from "react-icons/im";
import { BsThreeDots } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";
import IconButton from "./IconButton";

const QuickDetailsCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing.s28}
    ${({ theme }) => theme.spacing.s20};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  width: 100%;
  height: ${({ theme }) => theme.sizing.s128};
  position: relative;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &:hover {
    transform: scale(1.05);
  }

  & > div {
    .icon {
      height: ${({ theme }) => theme.sizing.s52};
      width: ${({ theme }) => theme.sizing.s52};
      padding: ${({ theme }) => theme.spacing.s12};
      color: ${({ theme }) => theme.palette.action.active};
      background-color: ${({ theme }) => theme.palette.background.dark};
      border-radius: 50%;
    }
    h3 {
      padding-bottom: ${({ theme }) => theme.spacing.s4};
      font-size: ${({ theme }) => theme.typography.fontSize.f20};
    }
    p {
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: ${({ theme }) => theme.typography.fontSize.f14};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    }
  }
  button {
    position: absolute;
    right: ${({ theme }) => theme.spacing.s12};
    top: ${({ theme }) => theme.spacing.s12};
    background-color: ${({ theme }) => theme.palette.background.dark};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      height: ${({ theme }) => theme.sizing.s30};
      width: ${({ theme }) => theme.sizing.s30};
      padding: ${({ theme }) => theme.spacing.s4};
      border-radius: 50%;
      color: ${({ theme }) => theme.palette.text.secondary};
      transition: all 0.1s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme.palette.background.paper};
      }
    }
  }
`;

export const QuickDetails = [
  {
    id: 1,
    icon: <HiOutlineBanknotes className="icon" />,
    title: "Total Loans",
    value: "08",
  },
  {
    id: 2,
    icon: <MdDoneAll className="icon" />,
    title: "Approved Loans",
    value: "05",
  },
  {
    id: 3,
    icon: <VscDebugAll className="icon" />,
    title: "Total Amounts",
    value: "Rs. 200000",
  },
  {
    id: 4,
    icon: <ImStatsBars className="icon" />,
    title: "Total Users",
    value: "10",
  },
];
export const profitability = [
  {
    id: 1,
    icon: <HiOutlineBanknotes className="icon" />,
    title: "Gross Profit Margin",
    value: "Rs. 200000",
  },
  {
    id: 2,
    icon: <MdDoneAll className="icon" />,
    title: "Operating Profit Margin",
    value: "Rs. 21500",
  },
  {
    id: 3,
    icon: <VscDebugAll className="icon" />,
    title: "Pretax Profit Margin",
    value: "Rs. 120005",
  },
  {
    id: 4,
    icon: <ImStatsBars className="icon" />,
    title: "Net Profit Margin",
    value: "503770",
  },
];

function QuickDetailsCard({ key, item, style }) {
  const theme = useTheme();
  return (
    <>
      <QuickDetailsCardWrapper className="shadow-md" key={key} style={style}>
        <IconButton>
          <BsThreeDots className="icon" />
        </IconButton>
        <div>{item.icon}</div>
        <div>
          <h3>{item.value}</h3>
          <p>{item.title}</p>
        </div>
      </QuickDetailsCardWrapper>
    </>
  );
}

export default QuickDetailsCard;
