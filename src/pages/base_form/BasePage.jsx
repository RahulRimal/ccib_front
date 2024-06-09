import React, { useState } from "react";
import styled from "styled-components";
import TabButtons from "../../components/TabButtons";
import InquiryForm from "../../components/Forms/InquiryForm";
import LoanAccountForm from "../../components/Forms/LoanAccountForm";
import LoanApplicationForm from "../../components/Forms/LoanApplicationForm";
import InstallmentForm from "../../components/Forms/InstallmentForm";
import BlackListForm from "../../components/Forms/BlackListForm";
import SecurityDepositForm from "../../components/Forms/SecurityDeposit";
import BlackListApplicationForm from "../../components/Forms/BlackListApplicationForm";


const formTabs = [
  {
    id: 1,
    title: "Inquiry",
    active: true,
    Component: InquiryForm,
  },
  {
    id: 2,
    title: "Loan Account",
    active: false,
    Component: LoanAccountForm,
  },
  /* {
    id: 4,
    title: "Blacklist",
    active: false,
    Component: BlackListForm,
  }, */
  {
    id: 5,
    title: "Security Deposit",
    active: false,
    Component: SecurityDepositForm,
  },
  {
    id: 6,
    title: "Loan Application",
    active: false,
    Component: LoanApplicationForm,
  },
  {
    id: 7,
    title: "Installment",
    active: false,
    Component: InstallmentForm,
  },
  /* {
    id: 9,
    title: "Blacklist Application",
    active: false,
    Component: BlackListApplicationForm,
  }, */
];

const SectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: 0 ${({ theme }) => theme.spacing.s12};
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;

const BasePage = () => {
  const [tabs, setTabs] = useState(formTabs);

  const activeForm = () => {
    return tabs.find((item) => item.active);
  };

  const form = activeForm();
  const Component = form.Component;

  return (
    <>
      <main>
        <SectionWrapper>
          <TabButtons
            formTabs={formTabs}
            setTabs={setTabs}
          />
        </SectionWrapper>
        <Component />
      </main>
    </>
  )

};

export default BasePage;
