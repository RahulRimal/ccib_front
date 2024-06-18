import React, { useEffect, useState } from "react";
import OptionField from "./Fields/OptionField";
import CheckboxField from "./Fields/CheckboxField";
import TextAreaField from "./Fields/TextAreaField";
import RadioField from "./Fields/RadioField";
import InputField from "./Fields/InputField";
import Button from "../Button";
import styled, { useTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { mainUrl } from "../../constants";
import { ClipLoader } from "react-spinners";
import { enqueueSnackbar } from "notistack";
import Backdrop from "../Backdrop";
import apiService from "../../api_service";

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

const BaseForm = ({ loading, title, fields, schema, endpoint }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const theme = useTheme();

  const onSubmitHandler = async (data) => {
    console.log("Form submitted:", data);

    try {
      const response = await apiService.post(`${mainUrl}${endpoint}/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", response.data);
      enqueueSnackbar("Form submitted successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      reset();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.log("Error 404: Invalid endpoint");
          return;
        }
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);

        Object.keys(error.response.data).map((item, index) => {
          setTimeout(() => {
            error.response.data[item].map((errorMessage) => {
              enqueueSnackbar(`${item}: ${errorMessage}`, {
                variant: "error",
                autoHideDuration: 2000,
              });
            });
          }, index * 500);
        });
      } else if (error.request) {
        console.error("Error request:", error.request);
        enqueueSnackbar("Network error: No response received", {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else {
        console.error("Error message:", error.message);
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }

      console.error("Error config:", error.config);
    }
  };

  return (
    <>
      <SectionWrapper
        style={{
          padding: `${theme.spacing.s16} ${theme.spacing.s12}`,
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <ClipLoader />
          </div>
        ) : (
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
              {title} Form
            </SectionHeading>
            <FormInputField>
              {fields.map(
                (field, i) =>
                  (field.type === "select" && (
                    <OptionField
                      key={i}
                      title={field.label}
                      required={field.required}
                      options={field.options}
                      name={field.name}
                      register={register}
                      control={control}
                      error={errors[field.name]?.message}
                      placeholder={field.placeholder}
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
                text="Check Status"
                isSubmitting={isSubmitting}
                type="submit"
                style={{
                  height: theme.sizing.s44,
                  padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
                  marginTop: theme.spacing.s16,
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            </span>
          </form>
        )}
      </SectionWrapper>

      {isSubmitting && (
        <Backdrop
          open={isSubmitting}
          backgroundColor="rgba(255, 255, 255, 0.7)"
        >
          <ClipLoader color="#000000" />
        </Backdrop>
      )}
    </>
  );
};

export default BaseForm;
