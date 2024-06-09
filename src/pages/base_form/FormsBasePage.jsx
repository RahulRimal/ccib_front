import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TabButtons from "../../components/TabButtons";
import InquiryForm from "../../components/Forms/InquiryForm";
import LoanAccountForm from "../../components/Forms/LoanAccountForm";
import LoanApplicationForm from "../../components/Forms/LoanApplicationForm";
import InstallmentForm from "../../components/Forms/InstallmentForm";
import BlackListForm from "../../components/Forms/BlackListForm";
import SecurityDepositForm from "../../components/Forms/SecurityDeposit";
import BlackListApplicationForm from "../../components/Forms/BlackListApplicationForm";
import { useParams } from "react-router-dom";
import AddUserFrom from "../../components/Forms/AddUserForm";

const formTabs = [
  {
    id: 1,
    key: "inquiry_form",
    title: "Inquiry",
    active: true,
    Component: InquiryForm,
  },
  {
    id: 2,
    key: "loan_account",
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
    key: "security_deposit",
    title: "Security Deposit",
    active: false,
    Component: SecurityDepositForm,
  },
  {
    id: 6,
    key: "loan_application",
    title: "Loan Application",
    active: false,
    Component: LoanApplicationForm,
  },
  {
    id: 7,
    key: "installment",
    title: "Installment",
    active: false,
    Component: InstallmentForm,
  },
  {
    id: 8,
    key: "users",
    title: "Add Users",
    active: false,
    Component: AddUserFrom,
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

const FormsBasePage = () => {
  const { formKey } = useParams();
  const [tabs, setTabs] = useState(formTabs);

  useEffect(() => {
    if (formKey) {
      setTabs(
        formTabs.map((item) => ({ ...item, active: item.key === formKey }))
      );
    }
  }, [formKey]);

  const activeForm = () => {
    return tabs.find((item) => item.active);
  };

  const form = activeForm();
  const Component = form.Component;

  return (
    <>
      <main>
        <SectionWrapper>
          <TabButtons tabs={tabs} setTabs={setTabs} />
        </SectionWrapper>
        <Component />
      </main>
    </>
  );
};

export default FormsBasePage;
