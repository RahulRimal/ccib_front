import React, { useEffect, useState } from "react";
import OptionField from "./OptionField";
import CheckboxField from "./CheckboxField";
import TextAreaField from "./TextAreaField";
import RadioField from "./RadioField";
import InputField from "./InputField";
import Button from "../Button";
import styled, { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formTabs } from "../../pages/base_form/data";
import { LiaStreetViewSolid } from "react-icons/lia";
import TabButtons from "../TabButtons";
import axios from "axios";
import { mainUrl } from "../../constants";
import useFetch from "../../custom_hooks/useFetch";

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

const BaseForm = () => {
  const [tabs, setTabs] = useState(formTabs);
  const [endpoints, setEndpoints] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedFinances, setFetchedFinances] = useState([]);
  const [mydata, setMydata] = useState([]);
  const { data } = useFetch({ url: `${mainUrl}auth/users` });
  const { data: finance } = useFetch({ url: `${mainUrl}cooperative/finance` });

  const activeField = () => {
    return tabs.find((item) => item.active);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(activeField().schema),
  });

  const theme = useTheme();

  const onSubmitHandler = async (data) => {
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        `${mainUrl}cooperative/${endpoints}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      reset();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get(`${mainUrl}auth/users`);

  //     if (response.status === 200) {
  //       const options = response.data.map((item) => {
  //         return {
  //           label: item.first_name,
  //           value: item.first_name,
  //         };
  //       });
  //       console.log(options);
  //       setFetchedoption(options);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUsers = () => {
    if (data) {
      const options = data.map((item) => {
        return {
          label: item.first_name,
          value: item.first_name,
        };
      });
      setFetchedUsers(options);
    }
  };
  const getFinances = () => {
    if (finance) {
      const options = finance.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setFetchedFinances(options);
    }
  };
  console.log(fetchedUsers);

  useEffect(() => {
    setEndpoints(tabs.filter((item) => item.active)[0].endpoint);
    getUsers();
    getFinances();
    reset();
  }, [tabs, reset, data, finance]);

  return (
    <>
      <div>
        <main>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.s8,
              paddingBottom: theme.spacing.s16,
            }}
          >
            <LiaStreetViewSolid
              className="icon"
              style={{ height: theme.sizing.s24, width: theme.sizing.s24 }}
            />
            <strong>Check Status</strong>
          </div>
          <SectionWrapper>
            <TabButtons
              formTabs={tabs}
              setEndpoints={setEndpoints}
              setTabs={setTabs}
            />
          </SectionWrapper>
          <SectionWrapper
            style={{
              padding: `${theme.spacing.s16} ${theme.spacing.s12}`,
            }}
          >
            <form
              method="POST"
              onSubmit={handleSubmit(onSubmitHandler)}
              style={{
                minHeight: "74vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <SectionHeading style={{ marginTop: theme.spacing.s16 }}>
                {activeField().title} Form
              </SectionHeading>
              <FormInputField>
                {activeField().fields.map(
                  (field, i) =>
                    (field.type === "select" && (
                      <OptionField
                        key={i}
                        title={field.label}
                        options={
                          field.label === "User"
                            ? fetchedUsers
                            : fetchedFinances
                        }
                        name={field.name}
                        register={register}
                        control={control}
                        error={errors[field.name]?.message}
                        defaultValue={field.defaultValue}
                      />
                    )) ||
                    (field.type === "checkbox" && (
                      <CheckboxField
                        required={field.required}
                        name={field.name}
                        title={field.label}
                        options={field.options}
                        register={register}
                        error={errors[field.name]?.message}
                        control={control}
                        defaultValue={field.defaultValue}
                      />
                    )) ||
                    (field.type === "textarea" && (
                      <TextAreaField
                        required={field.required}
                        placeholder={field.placeholder}
                        name={field.name}
                        title={field.label}
                        options={field.options}
                        register={register}
                        error={errors[field.name]?.message}
                      />
                    )) ||
                    (field.type === "radio" && (
                      <RadioField
                        control={control}
                        required={field.required}
                        name={field.name}
                        title={field.label}
                        labels={field.labels}
                        type={field.type}
                        options={field.options}
                        register={register}
                        error={errors[field.name]?.message}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                      />
                    )) ||
                    (field.type !== "textarea" &&
                      field.type !== "radio" &&
                      field.type !== "select" &&
                      field.type !== "checkbox" && (
                        <InputField
                          key={i}
                          title={field.label}
                          name={field.name}
                          type={field.type}
                          label={field.label}
                          required={field.required}
                          register={register}
                          error={errors[field.name]?.message}
                          placeholder={field.placeholder}
                          defaultValue={field.defaultValue}
                        />
                      ))
                )}
              </FormInputField>
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "0px",
                }}
              >
                <Button
                  text={"Check Status"}
                  isSubmitting={isSubmitting}
                  style={{
                    height: theme.sizing.s44,
                    padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
                    marginTop: theme.spacing.s16,
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
              </span>
            </form>
          </SectionWrapper>
        </main>
      </div>
    </>
  );
};

export default BaseForm;
