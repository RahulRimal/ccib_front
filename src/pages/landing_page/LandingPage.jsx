import React from "react";
import Button from "../../components/Button";
import { IoChevronDownSharp, IoSearchCircleOutline } from "react-icons/io5";
import styled, { useTheme } from "styled-components";
import { GiBank, GiCardPick } from "react-icons/gi";
import { MdShareLocation } from "react-icons/md";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizing.s44};
  padding: ${({ theme }) => `${theme.spacing.s0} ${theme.spacing.s12}`};
  background-color: ${({ theme }) => theme.palette.info.main};
  button {
    background-color: transparent;
  }
`;
const SectionHeading = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.f24};
  margin-bottom: ${({ theme }) => theme.spacing.s48};
  padding-bottom: ${({ theme }) => theme.spacing.s4};
  position: relative;
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 3px;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.palette.error.main};
  }
`;
const SectionWrapper = styled.section`
  padding: ${({ theme }) => `${theme.spacing.s48} ${theme.spacing.s20}`};
  & > div {
    & > p {
      text-align: center;
      font-size: ${({ theme }) => theme.typography.fontSize.f20};
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      margin-bottom: ${({ theme }) => theme.spacing.s48};
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

const commitment = [
  {
    id: 1,
    img: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ab!",
  },
  {
    id: 2,
    img: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ab!",
  },
  {
    id: 3,
    img: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ab!",
  },
  {
    id: 4,
    img: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ab!",
  },
  {
    id: 5,
    img: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ab!",
  },
];

const imp = [
  {
    id: 1,
    title: "John Doe",
    icon: <MdShareLocation className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
  {
    id: 2,
    title: "John Doe",
    icon: <IoChevronDownSharp className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
  {
    id: 3,
    title: "John Doe",
    icon: <GiBank className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
  {
    id: 4,
    title: "John Doe",
    icon: <GiCardPick className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
  {
    id: 5,
    title: "John Doe",
    icon: <MdShareLocation className="icon" />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
  },
];

function LandingPage() {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.palette.common.white, width: "100%" }}>
      <HeaderWrapper>
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
      </HeaderWrapper>
      <main style={{ width: "80%", margin: "auto" }}>
        <SectionWrapper>
          <SectionHeading>PAYEMENTS MODULE</SectionHeading>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              expedita perspiciatis soluta reprehenderit esse veniam veritatis.
            </p>
            <div
              style={{
                display: "flex",
                width: "80%",
                margin: "auto",
                gap: theme.spacing.s20,
              }}
            >
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
            </div>
          </div>
        </SectionWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5%",
          }}
        >
          <SectionWrapper style={{ width: "70%" }}>
            <SectionHeading>WE ARE COMMITTED TO</SectionHeading>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: theme.spacing.s16,
              }}
            >
              {commitment.map((item) => (
                <div
                  style={{
                    width: theme.sizing.s256,
                    display: "flex",
                    padding: theme.spacing.s20,
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt=""
                    style={{ width: theme.sizing.s36, borderRadius: "50%" }}
                  />
                  <p style={{ marginTop: theme.spacing.s28 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionWrapper>
          <div
            style={{
              width: "30%",
              backgroundColor: theme.palette.info.main,
              color: theme.palette.text.white,
              padding: theme.spacing.s28 + " " + theme.spacing.s20,
              borderTopRightRadius: "10%",
              borderBottomLeftRadius: "10%",
            }}
          >
            <SectionHeading>Why is Your Credit Report Important</SectionHeading>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing.s16,
              }}
            >
              {imp.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: theme.spacing.s16,
                  }}
                >
                  <span style={{ fontSize: theme.typography.fontSize.f36 }}>
                    {item.icon}
                  </span>
                  <p
                    style={{
                      color: theme.palette.text.primary,
                      color: theme.palette.text.white,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
