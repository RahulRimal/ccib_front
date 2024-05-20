import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import CircleAvatar from "../components/CircleAvatar";
import { FaLocationArrow } from "react-icons/fa6";
import LoanApplicationsTable from "../components/Tables/LoanApplicationsTable";
import ToolTip from "../components/ToolTip";
import Divider from "../components/Divider";
import { humanizeString } from "../helpers";
import axios from "axios";
import UserCreditHistoryChart from "../components/Charts/UserCreditHistory";
import { FaUser } from "react-icons/fa";
import ReactECharts from "echarts-for-react";
import IconButton from "../components/IconButton";
import RankSlider from "../components/RankSlider";
import { useParams } from "react-router-dom";
import { mainUrl } from "../constants";
import useFetch from "../custom_hooks/useFetch";
import UserDetailsTable from "../components/Tables/UserDetailsTable";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: ${({ theme }) => theme.spacing.s16};
  padding: ${({ theme }) => theme.spacing.s12};
`;

const Sidebar = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: ${({ theme }) => theme.spacing.s12};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;

const UserTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.f18};
  margin: ${({ theme }) => theme.spacing.s8} 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

const UserInfo = styled.p`
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  margin-bottom: ${({ theme }) => theme.spacing.s8};
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: left;
  span {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
  }
`;

const UserRecordSummarizedWrapper = styled.div`
  margin: 20px;
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.s16};
  border: 1px solid ${({ theme }) => theme.palette.border.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const UserRecordSummarizedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: ${({ theme }) => theme.spacing.s16};
  h2 {
    line-height: ${({ theme }) => theme.sizing.s36};
  }
`;

const fieldsToShow = [
  "first_name",
  "middle_name",
  "last_name",
  "citizenship_number",
  "citizenship_issued_date",
  "citizenship_issued_palce",
  "father_name",
  "phone_number",
  "dob",
];

const UserRecordSummarized = () => {
  const theme = useTheme();

  const option = {
    grid: { top: 20, right: 40, bottom: 50, left: 40 },
    title: {
      text: "Loans Per Month", // Add title here
      left: "center",
      bottom: 0,
      textStyle: {
        fontSize: theme.typography.fontSize.f16,
      },
    },
    xAxis: {
      type: "category",
      data: ["Item 1", "Item 2", "Item 3", "Item 4"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "fdfdf",
        data: [400, 300, 350, 200],
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <UserRecordSummarizedWrapper>
      <UserRecordSummarizedHeader>
        <div>
          <h2>Recorded Loans</h2>
          <h2>32</h2>
        </div>
        <IconButton>
          <FaUser
            style={{
              fontSize: theme.typography.fontSize.f24,
              background: theme.palette.background.dark,
              width: theme.sizing.s52,
              height: theme.sizing.s52,
              padding: theme.spacing.s12,
              borderRadius: theme.borderRadius.badge,
            }}
          />
        </IconButton>
      </UserRecordSummarizedHeader>
      <div>
        <ReactECharts
          option={option}
          style={{ height: "250px", width: "350px" }}
        />
      </div>
    </UserRecordSummarizedWrapper>
  );
};

const UserProfile = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { data, loading } = useFetch({
    url: `http://127.0.0.1:3001/users/1`,
  });

  return (
    <Wrapper>
      <main>
        <RankSlider />
        <UserCreditHistoryChart />
        <LoanApplicationsTable />
        <UserRecordSummarized />
        <UserDetailsTable />
      </main>
      <Sidebar>
        <div style={{ textAlign: "center", width: "100%" }}>
          <CircleAvatar
            url={
              "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            }
            alt="User profile image"
          />
          <UserTitle>Rahul Rimal</UserTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: theme.spacing.s4,
              marginBottom: theme.spacing.s8,
            }}
          >
            <FaLocationArrow />
            <p>Banke</p>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: theme.spacing.s8,
            }}
          >
            <ToolTip
              tooltip={"25 Active loans"}
              style={{ padding: `${theme.spacing.s8} 0` }}
            >
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.primary.main,
                  fontSize: theme.typography.fontSize.f24,
                }}
              >
                25
              </p>
              <p
                style={{
                  paddingTop: theme.spacing.s4,
                  fontWeight: theme.typography.fontWeight.semiBold,
                  fontSize: theme.typography.fontSize.f16,
                  color: theme.palette.primary.main,
                }}
              >
                Active
              </p>
            </ToolTip>
            <ToolTip
              tooltip={"3 Healty loans"}
              style={{ padding: `${theme.spacing.s8} 0` }}
            >
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.success.main,
                  fontSize: theme.typography.fontSize.f24,
                }}
              >
                3
              </p>
              <p
                style={{
                  paddingTop: theme.spacing.s4,
                  fontWeight: theme.typography.fontWeight.semiBold,
                  fontSize: theme.typography.fontSize.f16,
                  color: theme.palette.success.main,
                }}
              >
                Healthy
              </p>
            </ToolTip>
            <ToolTip
              tooltip={"4 Defaulted loans"}
              style={{ padding: `${theme.spacing.s8} 0` }}
            >
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.error.main,
                  fontSize: theme.typography.fontSize.f24,
                }}
              >
                4
              </p>
              <p
                style={{
                  paddingTop: theme.spacing.s4,
                  fontWeight: theme.typography.fontWeight.semiBold,
                  fontSize: theme.typography.fontSize.f16,
                  color: theme.palette.error.main,
                }}
              >
                Defaulted
              </p>
            </ToolTip>
          </div>
          <Divider />
        </div>
        <div style={{ padding: `${theme.spacing.s16} ${theme.spacing.s8}` }}>
          {data &&
            Object.keys(data).map((key) => (
              <UserInfo key={key}>
                <span>{humanizeString(key)} : </span>
                {humanizeString(data[key])}
              </UserInfo>
            ))}
        </div>
        <div style={{ width: "100%" }}>
          <Button
            text={"View Full Information"}
            style={{
              width: "100%",
              fontSize: theme.typography.fontSize.f16,
              padding: `${theme.spacing.s16} ${theme.spacing.s16}`,
              background: theme.palette.success.main,
            }}
          />
        </div>
      </Sidebar>
    </Wrapper>
  );
};

export default UserProfile;
