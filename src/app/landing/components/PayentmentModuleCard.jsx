import React from "react";
import styled, { useTheme } from "styled-components";
import { GiBank, GiCardPick } from "react-icons/gi";
import { MdShareLocation } from "react-icons/md";
import Button from "../../components/Button";

const PayementModuleWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  gap: ${({ theme }) => theme.spacing.s20};
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    width: 95%;
  }
  @media (max-width: 990px) {
    & > div {
      flex-basis: 50%;
    }
  }
`;

const payementModules = [
  {
    id: 1,
    title: "Know Your Credit",
    icon: <GiBank className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
  {
    id: 2,
    title: "CCIC Credit Tracker",
    icon: <GiCardPick className="icon" />,
    description:
      "Nunc tincidunt enim lectus, in scelerisque est egestas euismod. Donec mattis metus in aliquam dictum. Vestibulum libero mauris, faucibus at tortor nec, tristique vestibulum mauris.",
  },
  {
    id: 3,
    title: "CCIC Credit History",
    icon: <MdShareLocation className="icon" />,
    description:
      "Nunc tincidunt enim lectus, in scelerisque est egestas euismod. Donec mattis metus in aliquam dictum. Vestibulum libero mauris, faucibus at tortor nec, tristique vestibulum mauris.",
  },
];

function PayentmentModuleCard() {
  const theme = useTheme();
  return (
    <PayementModuleWrapper>
      {payementModules.map((item) => (
        <div
          className="shadow-md"
          key={item.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            flexBasis: "30.33%",
            flexGrow: 1,
            height: theme.sizing.s416,
            padding: theme.spacing.s20,
            background: theme.palette.background.default,
            borderRadius: theme.borderRadius.container,
          }}
        >
          <div>
            <span style={{ fontSize: theme.typography.fontSize.f52 }}>
              {item.icon}
            </span>
            <h2 style={{ height: theme.sizing.s44 }}>{item.title}</h2>
          </div>
          <p
            style={{
              color: theme.palette.text.secondary,
              lineHeight: theme.sizing.s24,
            }}
          >
            {item.description}
          </p>
          <Button
            style={{
              width: "fit-content",
              padding: theme.spacing.s12 + " " + theme.spacing.s24,
            }}
            text={"Get Started"}
          />
        </div>
      ))}
    </PayementModuleWrapper>
  );
}

export default PayentmentModuleCard;
