import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import QuickDetailsCard, {
  QuickDetails,
  profitability,
} from "../components/QuickDetailsCard";
import BaseTable from "../components/Tables/BaseTable";
import AnalyticsChart, {
  incomeChartOption,
  profitLossChartOption,
  loanOverviewChartOption,
  loanStatusChartOption,
  profibabilityRatioChartOption,
  loanHistoryChartOption,
} from "../components/Charts/AnalyticsChart";

const overdueLoans = [
  {
    id: 1,
    name: "John Doe",
    dueDate: "10/10/2021",
    status: "Overdue",
    amount: 1000,
  },
  {
    id: 2,
    name: "Jane Doe",
    dueDate: "10/10/2021",
    status: "Overdue",
    amount: 1000,
  },
  {
    id: 3,
    name: "John Doe",
    dueDate: "10/10/2021",
    status: "Overdue",
    amount: 1000,
  },
  {
    id: 4,
    name: "Jane Doe",
    dueDate: "10/10/2021",
    status: "Overdue",
    amount: 1000,
  },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 3,
    name: "John Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "vVqFP@example.com",
    status: "Active",
    amount: 1000,
    dob: "10/10/2021",
    phone_number: 1234567890,
    address: "123 Main St, Anytown, USA",
  },
];

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.s12};

  section {
    display: flex;
    gap: ${({ theme }) => theme.spacing.s16};
    & > div {
      width: 100%;
      background-color: ${({ theme }) => theme.palette.background.default};
      border-radius: ${({ theme }) => theme.borderRadius.container};
      margin: ${({ theme }) => theme.spacing.s8} 0;
      padding: ${({ theme }) => theme.spacing.s12};
    }
  }
`;

export const OverdueLoans = () => {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];
  return (
    <>
      <BaseTable
        isLoading={false}
        data={overdueLoans}
        columns={columns}
        title={"Overdue Loans"}
      />
    </>
  );
};

export const UsersTable = () => {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
  ];
  return (
    <>
      <BaseTable
        isLoading={false}
        data={users}
        columns={columns}
        title={"Consumers Table"}
      />
    </>
  );
};

function Dashboard() {
  const theme = useTheme();

  return (
    <Wrapper>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: theme.spacing.s16,
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          {QuickDetails.map((item, index) => (
            <QuickDetailsCard key={index} item={item} />
          ))}
        </div>
      </section>
      <section>
        <div style={{ minHeight: theme.sizing.s384 }}>
          <AnalyticsChart option={incomeChartOption()} />
        </div>
        <div style={{ minHeight: theme.sizing.s384 }}>
          <AnalyticsChart option={profitLossChartOption()} />
        </div>
      </section>
      <section>
        <div>
          <OverdueLoans />
        </div>
        <div>
          <AnalyticsChart option={loanOverviewChartOption()} />
        </div>
      </section>
      <section>
        <div>
          <UsersTable />
        </div>
        <div style={{ width: "50%" }}>
          <AnalyticsChart option={loanStatusChartOption()} />
        </div>
      </section>
      <section>
        <div>
          <AnalyticsChart option={profibabilityRatioChartOption()} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: theme.spacing.s16,
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          {profitability.map((item, index) => (
            <QuickDetailsCard
              key={index}
              item={item}
              style={{ width: "49%" }}
            />
          ))}
        </div>
      </section>
      <section>
        <div style={{ minHeight: theme.sizing.s384 }}>
          <AnalyticsChart option={loanHistoryChartOption()} />
        </div>
      </section>
    </Wrapper>
  );
}

export default Dashboard;
