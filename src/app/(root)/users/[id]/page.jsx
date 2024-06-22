"use client";
import styled, { useTheme } from "styled-components";
import CircleAvatar from "../../components/CircleAvatar";
import { FaLocationArrow } from "react-icons/fa6";
import LoanApplicationsTable from "../../components/Tables/LoanApplicationsTable";
import ToolTip from "../../components/ToolTip";
import Divider from "../../components/Divider";
import { humanizeString } from "../../../helpers";
import UserCreditHistoryChart from "../../components/Charts/UserCreditHistory";
import { FaUser } from "react-icons/fa";
import ReactECharts from "echarts-for-react";
import IconButton from "../../components/IconButton";
import RankSlider from "../../components/RankSlider";
import { mainUrl } from "../../constants";
import useFetch from "../../../custom_hooks/useFetch";
import UserDetailsTable from "../../components/Tables/UserDetailsTable";

import QuickDetailsCard, {
  QuickDetails,
} from "../../dashboard/components/QuickDetailsCard";
import BaseChart from "../../components/Charts/BaseChart";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: ${({ theme }) => theme.spacing.s16};
  padding: ${({ theme }) => theme.spacing.s12};

  main {
    & > div {
      background-color: ${({ theme }) => theme.palette.background.default};
      border-radius: ${({ theme }) => theme.borderRadius.container};
      margin: ${({ theme }) => theme.spacing.s12} 0;
      padding: ${({ theme }) => theme.spacing.s8};
    }
  }
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

const UserTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  margin: 0;
  letter-spacing: ${({ theme }) => theme.spacing.s2};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

const UserInfo = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.s8};
  font-size: ${({ theme }) => theme.typography.fontSize.f14};
  text-align: left;
  span {
    font-style: italic;
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.f12};
  }
`;

const UserRecordSummarizedWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.s12};
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
    title: {
      text: "Loans Per Month",
      left: "center",
      bottom: 0,
      textStyle: {
        fontSize: theme.typography.fontSize.f18,
      },
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr"],
    },
    yAxis: {
      type: "value",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Sumarized Loans",
        data: [400, 300, 350, 200],
        type: "bar",
        smooth: true,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        center: ["70%", "50%"],
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
        <ReactECharts option={option} />
      </div>
    </UserRecordSummarizedWrapper>
  );
};

const UserProfile = ({ id }) => {
  const theme = useTheme();

  const { data, loading } = useFetch({
    url: `${mainUrl}/cooperative/financeusers/${id}/`,
  });

  return (
    <Wrapper>
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: theme.spacing.s16,
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          {/* {QuickDetails.map((item, index) => (
            <QuickDetailsCard key={index} item={item} />
          ))} */}
        </div>
        <div>
          <RankSlider />
        </div>
        <div>
          <UserCreditHistoryChart />
        </div>
        <div>
          <LoanApplicationsTable />
        </div>
        <div
          style={{
            display: "grid",
            backgroundColor: "transparent",
            padding: 0,
            gap: theme.spacing.s16,
            gridTemplateColumns: " 1fr 1.5fr",
          }}
        >
          <UserRecordSummarized />
          <div
            style={{
              background: theme.palette.background.default,
              padding: theme.spacing.s12,
              borderRadius: theme.borderRadius.container,
            }}
          >
            {/* <BaseChart option={option} /> */}
          </div>
        </div>
        <div style={{ padding: 0 }}>
          <UserDetailsTable />
        </div>
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
              gap: "4px",
            }}
          >
            <FaLocationArrow />
            <p>Banke</p>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ToolTip tooltip={"25 Active loans"}>
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.primary.main,
                }}
              >
                25
              </p>
              <p
                style={{
                  fontSize: theme.typography.fontSize.f12,
                  color: theme.palette.primary.main,
                }}
              >
                Active
              </p>
            </ToolTip>
            <ToolTip tooltip={"3 Healty loans"}>
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.success.main,
                }}
              >
                3
              </p>
              <p
                style={{
                  fontSize: theme.typography.fontSize.f12,
                  color: theme.palette.success.main,
                }}
              >
                Healthy
              </p>
            </ToolTip>
            <ToolTip tooltip={"4 Defaulted loans"}>
              <p
                style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.palette.error.main,
                }}
              >
                4
              </p>
              <p
                style={{
                  fontSize: theme.typography.fontSize.f12,
                  color: theme.palette.error.main,
                }}
              >
                Defaulted
              </p>
            </ToolTip>
          </div>
          <Divider />
        </div>
        {data &&
          Object.keys(data).map((key) => (
            <UserInfo key={key}>
              <span>{humanizeString(key)}: </span>
              {humanizeString(data[key])}
            </UserInfo>
          ))}
      </Sidebar>
    </Wrapper>
  );
};

export default UserProfile;
