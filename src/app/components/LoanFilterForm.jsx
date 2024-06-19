import styled, { useTheme } from "styled-components";
import { theme } from "../theme";

const MainWrapper = styled.div`
  display: grid;
  padding: ${({ theme }) => theme.spacing.s12} 0;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: ${({ theme }) => theme.spacing.s16};
  @media (max-width: 1080px) {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 778px) {
    grid-template-columns: 1fr;
  }
`;

const SectionWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.s12} ${theme.spacing.s8}`};
  border: 1px solid ${({ theme }) => theme.palette.border.focused};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  display: flex;
  height: max-content;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.spacing.s12};
  box-sizing: border-box;
  position: relative;
  small {
    position: absolute;
    top: -${({ theme }) => theme.spacing.s8};
    background-color: ${({ theme }) => theme.palette.background.paper};
    padding: 0 ${({ theme }) => theme.spacing.s4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.s8};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: ${({ theme }) => theme.spacing.s4};
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  box-sizing: border-box;
  label {
    min-width: ${({ theme }) => theme.sizing.s98};
  }
  input {
    padding-top: 0;
    background: ${({ theme }) => theme.palette.background.default};
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    padding: 0 ${({ theme }) => theme.spacing.s8};
    height: ${({ theme }) => theme.sizing.s44};
    border: 1px solid ${({ theme }) => theme.palette.border.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.container};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.primary};
    }
  }
`;

const OptionWrapper = styled.div`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.s8};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: ${({ theme }) => theme.spacing.s4};
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  box-sizing: border-box;
  label {
    min-width: ${({ theme }) => theme.sizing.s98};
  }
  select {
    padding-top: 0;
    background: ${({ theme }) => theme.palette.background.default};
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    padding: 0 ${({ theme }) => theme.spacing.s8};
    height: ${({ theme }) => theme.sizing.s44};
    border: 1px solid ${({ theme }) => theme.palette.border.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.container};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.primary};
    }
  }
`;

function LoanFilterForm({ showFilters }) {
  const theme = useTheme();
  const sectionsData = [
    {
      title: "Date",
      inputs: [
        { label: "Date", type: "select", basis: 100, options: ["BS", "AD"] },
        { label: "From", type: "date", basis: 50, value: "2015-01-01" },
        { label: "Upto", type: "date", basis: 100, value: "2015-01-01" },
      ],
    },
    {
      title: "Loan",
      inputs: [
        {
          label: "Loan No.",
          type: "select",
          basis: 50,
          options: ["AGH134", "QRT564"],
        },
        {
          label: "Loan Scheme",
          type: "text",
          basis: 50,
          value: "Saral Karja Loan",
        },
        {
          label: "Loan Holder",
          type: "text",
          basis: 100,
          value: "Jeevan Shrestha",
        },
        {
          label: "Address",
          type: "text",
          basis: 50,
          value: "Kathmandu, Nepal",
        },
        {
          label: "Contact Number",
          type: "text",
          basis: 50,
          value: "9812234567",
        },
      ],
    },
    {
      title: "Details",
      inputs: [
        {
          label: "Loan Amount",
          type: "number",
          basis: 50,
          value: "26000.00",
        },
        {
          label: "Total Installments",
          type: "number",
          basis: 50,
          value: "4",
        },
        {
          label: "Interest Rate",
          type: "number",
          basis: 50,
          value: "24.00",
        },
        {
          label: "Penalty Rate",
          type: "number",
          basis: 50,
          value: "24.00",
        },
        {
          label: "Start Date",
          type: "date",
          basis: 50,
          value: "2015-01-01",
        },
        {
          label: " End Date",
          type: "date",
          basis: 50,
          value: "2015-01-01",
        },
      ],
    },
  ];

  return (
    <div className={showFilters ? "show" : "hide"}>
      <MainWrapper>
        {sectionsData.map((section, index) => (
          <SectionWrapper key={index}>
            <small>{section.title}</small>
            {section.inputs.map((input, i) =>
              input.type === "select" ? (
                <>
                  <OptionWrapper style={{ flexBasis: `${input.basis}%` }}>
                    <label htmlFor="">{input.label}</label>
                    <select
                      sx={{
                        background: "inherit",
                        height: theme.sizing.s30,
                      }}
                    >
                      {input.options.map((option, j) => (
                        <option key={j}>{option}</option>
                      ))}
                    </select>
                  </OptionWrapper>
                </>
              ) : (
                <InputWrapper key={i} style={{ flexBasis: `${input.basis}%` }}>
                  <label htmlFor="">{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.value}
                    name={input.label}
                    value={input.type === "date" ? input.value : ""}
                    onChange={(e) => e.target.value}
                  />
                </InputWrapper>
              )
            )}
          </SectionWrapper>
        ))}
      </MainWrapper>
    </div>
  );
}

export default LoanFilterForm;
