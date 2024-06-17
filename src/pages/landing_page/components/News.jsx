import React from "react";
import styled, { useTheme } from "styled-components";

import Button from "../../../components/Button";
import { TbMessages } from "react-icons/tb";

const NewsWrapper = styled.div`
  display: flex;
  width: 90%;
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

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30.33%;
  flex-grow: 1;
  gap: ${({ theme }) => theme.spacing.s20};
  position: relative;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s20};
  padding: ${({ theme }) => theme.spacing.s12};
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.text.secondary};
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: ${({ theme }) => theme.sizing.s192};
    object-fit: cover;
    object-position: center;
    border-radius: ${({ theme }) => theme.borderRadius.container};
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.02);
    }
  }
`;

const CardDateWrapper = styled.div`
  position: absolute;
  top: -${({ theme }) => theme.sizing.s10};
  left: ${({ theme }) => theme.sizing.s20};
  background-color: #43aa5c;
  width: 60px;
  height: 60px;
  border-radius: 0 0 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -${({ theme }) => theme.spacing.s12};
    border-left: 14px solid transparent;
    border-bottom: 10px solid #43aa5c;
  }
`;

const news = [
  {
    id: 1,
    title: "Know Your Credit",
    img: "https://picsum.photos/400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non cursus est. Pellentesque et suscipit ipsum. Nulla ullamcorper odio ac cursus ultricies. Nunc pellentesque porta porta. ",
    comments: "5",
    date: ["10", "Feb"],
  },
  {
    id: 2,
    title: "CCIC Credit Tracker",
    img: "https://picsum.photos/200",
    description:
      "Nunc tincidunt enim lectus, in scelerisque est egestas euismod. Donec mattis metus in aliquam dictum. Vestibulum libero mauris, faucibus at tortor nec, tristique vestibulum mauris.",
    comments: "52",
    date: ["23", "Mar"],
  },
  {
    id: 3,
    title: "CCIC Credit History",
    img: "https://picsum.photos/300",
    description:
      "Nunc tincidunt enim lectus, in scelerisque est egestas euismod. Donec mattis metus in aliquam dictum. Vestibulum libero mauris, faucibus at tortor nec, tristique vestibulum mauris.",
    comments: "35",
    date: ["04", "Jun"],
  },
];

function News() {
  const theme = useTheme();
  return (
    <NewsWrapper>
      {news.map((item) => (
        <CardWrapper className="shadow-md" key={item.id}>
          <CardDateWrapper>
            <span
              style={{
                textAlign: "center",
                fontWeight: theme.typography.fontWeight.semiBold,
              }}
            >
              {item.date[0]} <br /> {item.date[1]}
            </span>
          </CardDateWrapper>
          <ImageWrapper style={{ padding: theme.spacing.s0 }}>
            <img src={item.img} alt={item.title} />
          </ImageWrapper>
          <CardBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.s8,
              }}
            >
              <TbMessages
                className="icon"
                style={{
                  color: theme.palette.info.main,
                  fontSize: theme.typography.fontSize.f20,
                }}
              />
              <span>{item.comments} Comments</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </CardBody>
          <Button
            style={{
              marginBottom: theme.spacing.s20,
              width: "fit-content",
              alignSelf: "center",
              padding: theme.spacing.s16 + " " + theme.spacing.s24,
            }}
            text={"Read More"}
          />
        </CardWrapper>
      ))}
    </NewsWrapper>
  );
}

export default News;
