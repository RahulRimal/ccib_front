"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TabButtons from "@/app/components/TabButtons";
import { formTabs } from "./data";

const SectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: 0 ${({ theme }) => theme.spacing.s12};
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;

const FormsBasePage = ({ params: { base_form: formKey } }) => {
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
      <title>{form.title}</title>
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
