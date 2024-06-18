import styled, { useTheme } from "styled-components";
import Button from "./Button";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "./Forms/Fields/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import apiService from "../api_service";

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
  padding-bottom: ${({ theme }) => theme.spacing.s32};
  border: 1px solid ${({ theme }) => theme.palette.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  display: flex;
  height: max-content;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.spacing.s32};
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
  position: relative;
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
  span {
    position: absolute;
    top: calc(100% + ${({ theme }) => theme.spacing.s2});
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
  position: relative;

  label {
    min-width: ${({ theme }) => theme.sizing.s98};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }
  span {
    position: absolute;
    top: calc(100% + ${({ theme }) => theme.spacing.s2});
  }
`;

const customStyles = {
  cursor: "pointer",
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected && "black",
  }),
};

function FilterForm({
  showFilters,
  filterFields,
  baseUrl,
  setData,
  setLoading,
  validationSchema,
  responseHandler = null,
}) {
  const theme = useTheme();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const isEmptyObject = (obj) => Object.values(obj).every((value) => !value);

  const getTableInfo = async (data, url) => {
    if (isEmptyObject(data)) {
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.get(url, data);
      console.log(response);
      if (response.status === 200) {
        if (responseHandler) {
          response.data = responseHandler(response.data);
        }
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        return handleSubmit((data) => getTableInfo(data, baseUrl))(e);
      }}
      className={showFilters ? "show" : "hide"}
      style={{ overflow: "visible" }}
    >
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
                      <Controller
                        name={input.name}
                        control={control}
                        render={({ field }) => (
                          <>
                            {" "}
                            <Select
                              {...field}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              options={input.options}
                              isClearable
                              defaultValue={" "}
                              styles={customStyles}
                              theme={(themes) => ({
                                ...themes,
                                borderRadius: theme.borderRadius.input,
                                colors: {
                                  ...themes.colors,
                                  primary: theme.palette.background.dark,
                                },
                              })}
                              onChange={(selectedOption) => {
                                field.onChange(
                                  selectedOption ? selectedOption.value : ""
                                );
                              }}
                              value={input.options.find(
                                (option) => option.value === field.value
                              )}
                            />
                            {errors[input.name] && (
                              <ErrorMessage
                                error={errors[input.name]?.message}
                              />
                            )}
                          </>
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
                        {...(register && register(input.name))}
                        required={input.required}
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.name}
                      />
                      {errors[input.name] && (
                        <ErrorMessage error={errors[input.name]?.message} />
                      )}
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            text="Filter"
            style={{
              padding: `${theme.spacing.s8} ${theme.spacing.s20}`,
            }}
          />
        </div>
      )}
    </FormWrapper>
  );
}

export default FilterForm;
