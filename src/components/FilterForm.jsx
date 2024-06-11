import styled, { useTheme } from "styled-components";
import Button from "./Button";
import Select from "react-select";

const FormWrapper = styled.form`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: ${({ theme }) => theme.spacing.s16};
  margin-bottom: ${({ theme }) => theme.spacing.s12};
`;

const MainWrapper = styled.div`
  display: grid;
  padding: ${({ theme }) => theme.spacing.s12} 0;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.s16};
  @media (max-width: 1080px) {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 778px) {
    grid-template-columns: 1fr;
  }
`;

const SectionWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing.s20} ${theme.spacing.s8}`};
  border: 1px solid ${({ theme }) => theme.palette.border.primary};
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
    background-color: ${({ theme }) => theme.palette.background.default};
    padding: 0 ${({ theme }) => theme.spacing.s4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  .react-select__menu {
    z-index: 990000;
  }
  .react-select__control {
    height: ${({ theme }) => theme.sizing.s44};
    border-radius: ${({ theme }) => theme.borderRadius.input};
    border: 2px solid ${({ theme }) => theme.palette.border.primary};
  }
  .react-select__control--is-focused {
    border: 2px solid ${({ theme }) => theme.palette.border.focused};

    &:hover {
      border-color: ${({ theme }) => theme.palette.border.focused};
    }
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
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }
  input {
    padding-top: 0;
    background: ${({ theme }) => theme.palette.background.default};
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    padding: 0 ${({ theme }) => theme.spacing.s8};
    height: ${({ theme }) => theme.sizing.s44};
    border: 2px solid ${({ theme }) => theme.palette.border.primary};
    border-radius: ${({ theme }) => theme.borderRadius.input};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.focused};
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
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }
`;

const customStyles = {
  cursor: "pointer",
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected && "black",
  }),
};

function FilterForm({ showFilters, filterFields }) {
  const theme = useTheme();

  return (
    <FormWrapper method="GET" className={showFilters ? "show" : "hide"}>
      <MainWrapper>
        {filterFields ? (
          <>
            {filterFields.map((section, index) => (
              <SectionWrapper key={index}>
                <small>{section.title}</small>
                {section.inputs.map((input, i) =>
                  input.type === "select" ? (
                    <OptionWrapper
                      key={i}
                      style={{ flexBasis: `${input.basis}%` }}
                    >
                      <label htmlFor="">{input.label}</label>
                      <Select
                        name={input.name}
                        {...input}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={input.options}
                        isClearable
                        styles={customStyles}
                        theme={(themes) => ({
                          ...themes,
                          borderRadius: theme.borderRadius.input,
                          colors: {
                            ...themes.colors,
                            primary: theme.palette.background.dark,
                          },
                        })}
                        value={input.options.find(
                          (option) => option.value === input.value
                        )}
                      />
                    </OptionWrapper>
                  ) : (
                    <InputWrapper
                      key={i}
                      style={{ flexBasis: `${input.basis}%` }}
                    >
                      <label htmlFor="">{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.label}
                        onChange={(e) => e.target.value}
                      />
                    </InputWrapper>
                  )
                )}
              </SectionWrapper>
            ))}
          </>
        ) : (
          <p>No data</p>
        )}
      </MainWrapper>
      {filterFields && (
        <Button
          text="Filter"
          style={{
            padding: `${theme.spacing.s8} ${theme.spacing.s20}`,
            float: "right",
          }}
        />
      )}
    </FormWrapper>
  );
}

export default FilterForm;
