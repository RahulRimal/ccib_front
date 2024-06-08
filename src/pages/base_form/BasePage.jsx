import React, {  useState } from "react";
import RadioField from "../../components/Forms/RadioField";
import styled, { useTheme } from "styled-components";
import { formTabs } from "./data";
import TabButtons from "../../components/TabButtons";
import InquiryForm from "../../components/Forms/InquiryForm";

const SectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: 0 ${({ theme }) => theme.spacing.s12};
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;

const SectionHeading = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.f18};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing.s20};
`;

const FormInputField = styled.div`
  display: flex;
  width: 100%;
  column-gap: 1%;
  row-gap: ${({ theme }) => theme.spacing.s8};
  position: relative;
  flex-wrap: wrap;
  & > div {
    min-width: 30%;
    flex: 1;
    padding-bottom: ${({ theme }) => theme.spacing.s20};
    input {
      background-color: ${({ theme }) => theme.palette.background.dark};
      height: ${({ theme }) => theme.sizing.s52};
    }
  }
`;


const BasePage = () => {
  const [tabs, setTabs] = useState(formTabs);
  const [endpoints, setEndpoints] = useState("");

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
            formTabs={tabs}
            setEndpoints={setEndpoints}
            setTabs={setTabs}
          />
        </SectionWrapper>
        <Component fieldInfo={form} />
      </main>
    </>
  )

};

export default BasePage;
