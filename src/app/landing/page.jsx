"use client";

import React from "react";
import Button from "../components/Button";
import { IoChevronDownSharp, IoSearchCircleOutline } from "react-icons/io5";
import styled, { useTheme } from "styled-components";
import { GiBank, GiCardPick } from "react-icons/gi";
import { MdShareLocation } from "react-icons/md";
import PayentmentModuleCard from "./components/PayentmentModuleCard";
import Navbar from "./components/Navbar";
import MainBanner from "./components/MainBanner";
// import { useNavigate } from "react-router-dom";
// import Footer from "../../../components/Footer";

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
  // const navigate = useNavigate();
  return (
    <>
      {/* <MainBanner /> */}
      <main style={{ width: "90%", margin: "auto" }}>
        <SectionWrapper>
          <SectionHeading>PAYEMENTS MODULE</SectionHeading>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              expedita perspiciatis soluta reprehenderit esse veniam veritatis.
            </p>
            <PayentmentModuleCard />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeading></SectionHeading>
        </SectionWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "3%",
          }}
        >
          <SectionWrapper style={{ flexBasis: "60%" }}>
            <SectionHeading>WE ARE COMMITTED TO</SectionHeading>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: theme.spacing.s16,
              }}
            >
              {commitment.map((item, key) => (
                <div
                  key={key}
                  style={{
                    width: theme.sizing.s224,
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
              flexBasis: "40%",
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
                    height: "100%",
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
    </>
  );
}

export default LandingPage;
