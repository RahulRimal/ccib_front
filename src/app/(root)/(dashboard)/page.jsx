"use client";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import QuickDetailsCard, {
  QuickDetails,
  profitability,
} from "@/app/components/Charts/BaseChart";
import BaseChart, {
  profibabilityRatioChartOption,
  loanHistoryChartOption,
} from "@/app/components/Charts/BaseChart";

import useFetch from "@/custom_hooks/useFetch";

import { mainUrl } from "@/app/constants";

import ProfitLossChart from "./components/ProfitLossChart";

import IncomeChart from "./components/IncomeChart";
import AppliedLoansOverviewChart from "./components/AppliedLoansOverviewChart";
import OverdueLoansTable from "./components/OverdueLoansTable";
import FinanceUsersTable from "./components/FinanceUsersTable";
import LoanStatusOverviewChart from "./components/LoanStatusOverviewChart";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.s12};

  section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.s16};
    & > div {
      min-width: 300px;
      flex: 1;
      width: 100%;
      background-color: ${({ theme }) => theme.palette.background.default};
      border-radius: ${({ theme }) => theme.borderRadius.container};
      margin: ${({ theme }) => theme.spacing.s8} 0;
      padding: ${({ theme }) => theme.spacing.s12};
    }
  }
`;

function Dashboard() {
  const theme = useTheme();

  const { loading, data: quickSummary } = useFetch({
    url: `${mainUrl}/cooperative/finance/quick_summary?finance=FBXV6ZkP3REMxfTUCFSJmP`,
  });

  return (
    <Wrapper>
      {quickSummary && (
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
            {Object.keys(quickSummary).map((key, index) => (
              <QuickDetailsCard key={index} item={quickSummary[key]} />
            ))}
          </div>
        </section>
      )}
      <section>
        <div>
          <IncomeChart />
        </div>
        <div>
          <ProfitLossChart />
        </div>
      </section>
      <section>
        <div style={{ flex: 1.5 }}>
          <OverdueLoansTable />
        </div>
        <div>
          <AppliedLoansOverviewChart />
        </div>
      </section>
      <section>
        <div style={{ flex: 2 }}>
          <FinanceUsersTable />
        </div>
        <div>
          <LoanStatusOverviewChart />
        </div>
      </section>
      <section>
        <div>
          <BaseChart option={profibabilityRatioChartOption()} />
        </div>
        {/* <div
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
        </div> */}
      </section>
      <section>
        <div style={{ minHeight: theme.sizing.s384 }}>
          <BaseChart option={loanHistoryChartOption()} />
        </div>
      </section>
    </Wrapper>
  );
}

export default Dashboard;
