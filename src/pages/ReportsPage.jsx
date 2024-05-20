import React from "react";
import SectionHeading from "../components/ScetionHeading";
import RankSlider from "../components/RankSlider";
import styled, { useTheme } from "styled-components";
import { GiSpeedometer } from "react-icons/gi";
import { FcComboChart } from "react-icons/fc";
import UserCreditHistoryChart from "../components/Charts/UserCreditHistory";
import DetailsTable from "../components/Tables/DetailsTable";

export const QuickReportCard = ({ color, icon, value, text, interval }) => {
  const theme = useTheme();
  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: theme.spacing.s8,
          height: theme.sizing.s128,
          padding: theme.spacing.s8 + " " + theme.spacing.s20,
          background: theme.palette.background.default,
          borderRadius: theme.borderRadius.container,
        }}
      >
        {icon && <div style={{ color: color }}>{icon}</div>}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: color, textAlign: "center" }}>{value}</h1>
          <p style={{ lineHeight: theme.sizing.s30 }}>{text}</p>
          {interval && <p>({interval})</p>}
        </div>
      </div>
    </>
  );
};

export const Explanation = ({ text, notText }) => {
  const theme = useTheme();
  const Wrapper = styled.div`
    p {
      color: ${({ theme }) => theme.palette.text.primary};
      line-height: ${({ theme }) => theme.sizing.s20};
      span {
        color: ${({ theme }) => theme.palette.secondary.main};
      }
    }
  `;
  return (
    <Wrapper>
      <p style={{ paddingBottom: theme.spacing.s8 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        doloribus <span>{text}</span> similique suscipit repudiandae dolorum{" "}
        <span>{notText}</span> sit ipsa expedita nisi quasi hic autem, quibusdam
        temporibus pariatur, dignissimos laboriosam harum explicabo.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perferendis
        odio labore? Earum esse fugit aut reprehenderit, maiores quis ipsam ad
        quas optio, hic ex!
      </p>
    </Wrapper>
  );
};

const ReportSection = ({
  children,
  headingText,
  headerWidth,
  style,
  headerTextLeft,
  headerTextRight,
  headerTextCenter,
}) => {
  const theme = useTheme();
  return (
    <>
      <div style={style}>
        <SectionHeading
          text={headingText}
          background={theme.palette.secondary.dark}
          color={theme.palette.text.white}
          width={headerWidth || "auto"}
          center={headerTextCenter}
          left={headerTextLeft}
          right={headerTextRight}
          style={{
            padding: theme.spacing.s8,
            fontWeight: theme.typography.fontWeight.semiBold,
          }}
        />
        {children}
      </div>
    </>
  );
};
const Wrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.s12};
  margin-bottom: ${({ theme }) => theme.spacing.s20};
  border: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;

function ReportsPage() {
  const theme = useTheme();
  return (
    <div style={{ padding: theme.spacing.s12 }}>
      <ReportSection
        headingText={"Consumner Loan Score Report"}
        headerTextCenter
      />
      <ReportSection
        headingText={"Quick Reports"}
        style={{ marginTop: theme.spacing.s48 }}
        headerTextLeft
        headerWidth={"30%"}
      >
        <Wrapper>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing.s64,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <QuickReportCard
              icon={<GiSpeedometer fontSize={theme.typography.fontSize.f86} />}
              color={theme.palette.warning.main}
              value={"180"}
              text={"Evaluation Month Feb 24"}
            />
            <QuickReportCard
              icon={<FcComboChart fontSize={theme.typography.fontSize.f86} />}
              color={theme.palette.warning.main}
              value={"23.43%"}
              text={"Probrability of Default % Month Feb 24"}
              interval={"Jan-24 - Mar-24"}
            />
            <QuickReportCard
              color={theme.palette.warning.main}
              value={"Prime A"}
              text={"Evaluation Month Feb 24"}
            />
          </div>
          <div>
            <SectionHeading
              text={"Categories : "}
              fontSize={theme.typography.fontSize.f20}
              color={theme.palette.error.main}
              left
              style={{
                marginTop: theme.spacing.s12,
                marginBottom: 0,
                padding: `${theme.spacing.s8} 0`,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            />
            <RankSlider />
          </div>
          <div style={{ marginTop: theme.spacing.s48 }}>
            <p
              style={{
                fontWeight: theme.typography.fontWeight.semiBold,
                fontSize: theme.typography.fontSize.f16,
                paddingBottom: theme.spacing.s8,
              }}
            >
              Explanation:
            </p>
            <Explanation text={"10.23%"} notText={"10.23%"} />
          </div>
        </Wrapper>
      </ReportSection>
      <ReportSection
        headingText={"Score Reports for last 3 months"}
        style={{ marginTop: theme.spacing.s32 }}
        headerTextLeft
        headerWidth={"30%"}
      >
        <Wrapper>
          <UserCreditHistoryChart />
        </Wrapper>
      </ReportSection>
      <ReportSection
        headingText={"Report Details"}
        style={{ marginTop: theme.spacing.s32 }}
        headerTextLeft
        headerWidth={"30%"}
      >
        <Wrapper
          style={{ padding: "0", borderRadius: theme.borderRadius.input }}
        >
          <DetailsTable />
        </Wrapper>
      </ReportSection>
      <ReportSection
        headingText={"Search Details"}
        style={{ marginTop: theme.spacing.s32 }}
        headerTextLeft
        headerWidth={"30%"}
      >
        <Wrapper
          style={{ padding: "0", borderRadius: theme.borderRadius.input }}
        >
          <DetailsTable />
        </Wrapper>
      </ReportSection>
      <ReportSection
        headingText={"Consumer Details"}
        style={{ marginTop: theme.spacing.s32 }}
        headerTextLeft
        headerWidth={"30%"}
      >
        <Wrapper
          style={{ padding: "0", borderRadius: theme.borderRadius.input }}
        >
          <DetailsTable />
        </Wrapper>
      </ReportSection>
    </div>
  );
}

export default ReportsPage;
