import React, { useMemo, useState } from "react";
import SectionHeading from "../components/ScetionHeading";
import RankSlider from "../components/RankSlider";
import styled, { useTheme } from "styled-components";
import { GiSpeedometer } from "react-icons/gi";
import { FcComboChart } from "react-icons/fc";
import DetailsTable from "../components/Tables/DetailsTable";
import ClassificationTable from "../components/Tables/ClassificationTable";
import ScoreHistoryChart from "../components/Charts/ScoreHistoryChart";
import AmountOverdueChart from "../components/Charts/AmountOverdueChart";
import BaseTable from "../components/Tables/BaseTable";
import PieChart from "../components/Charts/PieChart";
import data from "../components/Tables/students.json";
import useFetchTable from "../custom_hooks/useFetchTable";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../constants";
import { getFullName, humanizeString } from "../helpers";
import { usePDF } from "react-to-pdf";
import { FaRegFilePdf } from "react-icons/fa6";
import Backdrop from "../components/Backdrop";
import { ClipLoader } from "react-spinners";

const columns1 = [
  {
    header: " ",
    columns: [
      {
        header: "Types of Loan Accounts (Products)",
        accessorKey: "type",
        cell: (info) => info.getValue(),
      },
      {
        header: "Types of Loan Accounts (Products)",
        accessorKey: "no_of_accounts",
        cell: (info) => info.getValue(),
      },
      {
        header: "Types of Loan Accounts (Products)",
        accessorKey: "opened",
        cell: (info) => info.getValue(),
      },
      {
        header: "Types of Loan Accounts (Products)",
        accessorKey: "closed",
        cell: (info) => info.getValue(),
      },
    ],
  },

  {
    header: "Amount Overdue(NPR)",
    columns: [
      {
        accessorKey: "age",
        header: "Accounts Overdue(NPR)",
      },
      {
        accessorKey: "email",
        header: "Persentage Overdue",
        aggregationFn: "",
      },
      {
        accessorKey: "date_of_birth",
        header: "Percent Amount Overdue",
        aggregationFn: "",
      },
      {
        accessorKey: "date_of_admission",
        header: "Recent Overdue Date",
        aggregationFn: "",
      },
    ],
  },
];
const columns3 = [
  {
    header: "Description",
    accessorKey: "email",
    cell: (info) => info.getValue(),
  },
  {
    header: "Amount(NPR)",
    accessorKey: "no_of_accounts",
    cell: (info) => info.getValue(),
  },
  {
    header: "Description",
    accessorKey: "date_of_birth",
    cell: (info) => info.getValue(),
  },
  {
    header: "Amount(NPR)",
    accessorKey: "closed",
    cell: (info) => info.getValue(),
  },
];
const columns5 = [
  {
    header: " ",
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },
  {
    header: "No. of Active Blcklist Reporting",
    accessorKey: "age",
    cell: (info) => info.getValue(),
  },
  {
    header: "No.of Institutions",
    accessorKey: "date_of_birth",
    cell: (info) => info.getValue(),
  },
  {
    header: "Most recently Reported Active Blcklist Details",
    accessorKey: "closed",
    cell: (info) => info.getValue(),
  },
];

const columns6 = [
  {
    header: "Institution Type",
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },
  {
    header: "No. in last 12 monthd",
    accessorKey: "age",
    cell: (info) => info.getValue(),
  },
  {
    header: "Inquery Reason",
    accessorKey: "date_of_birth",
    cell: (info) => info.getValue(),
  },
  {
    header: "No. in last 12 months",
    accessorKey: "closed",
    cell: (info) => info.getValue(),
  },
];

const columns2 = [
  {
    header: "Indicator",
    accessorKey: "date_of_admission",
    cell: (info) => info.getValue(),
  },
  {
    header: "Status",
    accessorKey: "lastName",
    cell: (info) => info.getValue(),
  },
  {
    header: "Recorded Months",
    accessorKey: "date_of_birth",
    cell: (info) => info.getValue(),
  },
];
const columns4 = [
  {
    header: "Institution Type",
    accessorKey: "address.city",
    cell: (info) => info.getValue(),
  },
  {
    header: "Number of Accounts",
    accessorKey: "lastName",
    cell: (info) => info.getValue(),
  },
  {
    header: "Limit Amount (NPR)",
    accessorKey: "date_of_birth",
    cell: (info) => info.getValue(),
  },
  {
    header: "Total Outstanding Balance (NPR)",
    accessorKey: "lastName",
    cell: (info) => info.getValue(),
  },
  {
    header: "Amount Overdue (NPR)",
    accessorKey: "age",
    cell: (info) => info.getValue(),
  },
];

const data1 = [
  { value: 98, name: "Overdue" },
  { value: 2, name: "Current Outstanding" },
];

const data2 = [
  { value: 100, name: "Banks" },
  { value: 0, name: "Other Companies" },
  { value: 0, name: "Finincial Institution" },
  { value: 0, name: "Microfinance Institution " },
  { value: 0, name: "Co-Operatives " },
];

const data3 = [{ value: 100, name: "New Credit Application" }];

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
  width,
  headerTextLeft,
  headerTextRight,
  headerTextCenter,
}) => {
  const theme = useTheme();
  return (
    <>
      <div style={(style, { width: width || "100%" })}>
        <SectionHeading
          text={headingText}
          background={theme.palette.secondary.dark}
          color={theme.palette.text.white}
          width={headerWidth || "100%"}
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
  /* min-height: 40px; */
  padding: ${({ theme }) => theme.spacing.s8};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.s20};
  border: 1px solid ${({ theme }) => theme.palette.secondary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  & > p {
    line-height: 40px;
  }
`;

const PdfButton = styled.div`
  color: ${({ theme }) => theme.palette.text.white};
  padding: ${({ theme }) => theme.spacing.s8};
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.s28};
  right: ${({ theme }) => theme.spacing.s12};
  background: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.f20};
  cursor: pointer;
`;

const handleResponse = (data) => {
  return data.map((item) => {
    const { first_name, middle_name, last_name } = item.user;
    return {
      ...item,
      user: getFullName({ first_name, middle_name, last_name }),
      finance: item.finance.name,
    };
  });
};
function ReportPage() {
  const theme = useTheme();

  const [downloading, setDownloading] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "reports.pdf" });

  const customRenderer = {
    status: (info) => {
      const colors = {
        pending: theme.palette.warning.main,
        approved: theme.palette.success.main,
        rejected: theme.palette.error.main,
      };
      const value = info.getValue();
      return <p style={{ color: colors[value] }}>{info.getValue()}</p>;
    },
  };

  const { loading, rowData, columns } = useFetchTable({
    url: `${mainUrl}/cooperative/blacklists/`,
    columnsToHide: ["idx"],
    responseHandler: handleResponse,
    customRenderer: customRenderer,
  });
  const customHeaderRenderer = (header) => {
    return <span style={{ fontWeight: "bold" }}>{humanizeString(header)}</span>;
  };
  const data = useMemo(() => rowData, [rowData]);

  const handlePdfGeneration = () => {
    setDownloading(true);
    setTimeout(async () => {
      await toPDF();
      setDownloading(false);
    }, 500);
  };

  return (
    <>
      <Backdrop
        open={downloading}
        style={{
          position: "fixed",
          zIndex: 999,
        }}
      >
        <ClipLoader color="#fff" />
      </Backdrop>
      <div ref={targetRef} style={{ position: "relative" }}>
        <PdfButton onClick={handlePdfGeneration}>
          <FaRegFilePdf />
        </PdfButton>
        <ReportSection
          headingText={"Consumner Loan Score Report"}
          headerTextCenter
          style={{ marginTop: theme.spacing.s48 }}
        />
        <ReportSection
          headingText={"Quick Reports"}
          style={{ marginTop: theme.spacing.s48 }}
          headerTextLeft
          headerWidth={"30%"}
        >
          <Wrapper style={{ padding: theme.spacing.s12 }}>
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
                icon={
                  <GiSpeedometer fontSize={theme.typography.fontSize.f86} />
                }
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
          <Wrapper style={{ background: theme.palette.background.default }}>
            <ScoreHistoryChart style={{ height: "550px" }} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Report Details"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          headerWidth={"30%"}
        >
          <Wrapper>
            <DetailsTable />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Search Details"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          headerWidth={"30%"}
        >
          <Wrapper>
            <DetailsTable />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Blacklist Indicator"}
          style={{ marginTop: theme.spacing.s32 }}
          width={"100%"}
          headerTextLeft
        >
          <Wrapper>
            <BaseTable isLoading={loading} data={data} columns={columns} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Blacklist Indicator"}
          style={{ marginTop: theme.spacing.s32 }}
          width={"100%"}
          headerTextLeft
        >
          <Wrapper style={{ padding: `0 ${theme.spacing.s12}` }}>
            <p>No Data Available</p>
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Blacklist History"}
          style={{ marginTop: theme.spacing.s32 }}
          width={"100%"}
          headerTextLeft
        >
          <Wrapper style={{ padding: `0 ${theme.spacing.s12}` }}>
            <p>No Data Available</p>
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Credit Profile Overview"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          width={"60%"}
        >
          <Wrapper>
            <BaseTable data={data} columns={columns2} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Classification of Active Accounts by Institution Type"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          width={"100%"}
        >
          <Wrapper>
            <BaseTable data={data} columns={columns4} width={"100%"} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Classification of Active Accounts by Product Type"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          width={"100%"}
        >
          <Wrapper>
            <BaseTable columns={columns1} data={data} />
          </Wrapper>
          <Wrapper>
            <BaseTable data={data} columns={columns1} width={"100%"} />
          </Wrapper>
          <Wrapper>
            <BaseTable data={data} columns={columns1} width={"100%"} />
          </Wrapper>
        </ReportSection>
        <div style={{ display: "flex", maxHeight: "fit-content", gap: "12px" }}>
          <ReportSection
            headingText={"Total Liability Summary"}
            style={{ marginTop: theme.spacing.s32 }}
            headerTextLeft
          >
            <Wrapper>
              <BaseTable data={data} columns={columns3} />
            </Wrapper>
          </ReportSection>
          <Wrapper
            style={{
              backgroundColor: theme.palette.background.default,
              height: "inherit",
            }}
          >
            <AmountOverdueChart />
          </Wrapper>
        </div>
        <ReportSection
          headingText={"Inquiry Summary"}
          style={{ marginTop: theme.spacing.s32 }}
          width={"70%"}
          headerTextLeft
        >
          <Wrapper>
            <BaseTable data={data} columns={columns6} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Classification of Active Loans by Institution Type"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          width={"100%"}
        >
          <Wrapper>
            <BaseTable data={data} columns={columns4} width={"100%"} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Classification of Active Loans by Product Type"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          headerWidth={"100%"}
        >
          <Wrapper>
            <BaseTable columns={columns4} data={data} />
          </Wrapper>
          <Wrapper>
            <BaseTable data={data} columns={columns4} width={"100%"} />
          </Wrapper>
        </ReportSection>
        <ReportSection
          headingText={"Classification of Active Accounts by Product Type"}
          style={{ marginTop: theme.spacing.s32 }}
          headerTextLeft
          width={"100%"}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: theme.spacing.s20,
              // flexWrap: "wrap",
            }}
          >
            <Wrapper>
              <PieChart data={data1} title={"Overdue"} />
            </Wrapper>
            <Wrapper>
              <PieChart data={data2} title={"Institution Type(Inquiry)"} />
            </Wrapper>
            <Wrapper>
              <PieChart data={data3} title={"Inquiry Reason"} />
            </Wrapper>
          </div>
        </ReportSection>
      </div>
    </>
  );
}

export default ReportPage;
