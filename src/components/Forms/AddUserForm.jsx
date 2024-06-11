import React, { useEffect, useState } from "react";
import BaseForm from "./BaseForm";
import useFetch from "../../custom_hooks/useFetch";
import { mainUrl } from "../../constants";
import * as yup from "yup";
let fields = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    required: false,
    defaultValue: "",
    placeholder: "Enter First Name",
  },
  {
    label: "Middle Name",
    name: "middle_name",
    type: "text",
    required: false,
    defaultValue: "",
    placeholder: "Enter Middle Name",
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
    required: false,
    defaultValue: "",
    placeholder: "Enter Last Name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    defaultValue: "",
    placeholder: "Enter Email Address",
  },
  {
    label: "Citizenship Number",
    name: "citizenship_number",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Citizenship Number",
  },
  {
    label: "Citizenship Issued Place",
    name: "citizenship_issued_place",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Issued Place",
  },
  {
    label: "Citizenship Issued Date",
    name: "citizenship_issued_date",
    type: "date",
    required: true,
    defaultValue: "",
    placeholder: "Enter Issued Date",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
    defaultValue: "male",
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    required: false,
    defaultValue: "",
    placeholder: "Enter Date of Birth",
  },
  {
    label: "Father's Name",
    name: "father_name",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Father's Name",
  },
  {
    label: "Mother's Name",
    name: "mother_name",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Mother's Name",
  },
  {
    label: "Grandfather's Name",
    name: "grandfather_name",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Grandfather's Name",
  },
  {
    label: "Phone Number",
    name: "phone_number",
    type: "text",
    required: false,
    defaultValue: "",
    placeholder: "Enter Phone Number",
  },
  {
    label: "Permanent Address",
    name: "permanent_address",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Permanent Address",
  },
  {
    label: "Temporary Address",
    name: "temporary_address",
    type: "text",
    required: true,
    defaultValue: "",
    placeholder: "Enter Temporary Address",
  },
];
const schema = yup.object().shape({
  first_name: yup
    .string()
    .max(150, "First name must be at most 150 characters"),
  middle_name: yup
    .string()
    .max(150, "Middle name must be at most 150 characters"),
  last_name: yup.string().max(150, "Last name must be at most 150 characters"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  citizenship_number: yup
    .string()
    .max(50, "Citizenship number must be at most 50 characters")
    .required("Citizenship number is required"),
  citizenship_issued_place: yup
    .string()
    .max(255, "Citizenship issued place must be at most 255 characters")
    .required("Citizenship issued place is required"),
  citizenship_issued_date: yup
    .date()
    .typeError("Citizenship issued date must be a valid date")
    .required("Citizenship issued date is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Gender is required"),
  dob: yup.date().typeError("Date of birth must be a valid date"),
  father_name: yup
    .string()
    .max(255, "Father's name must be at most 255 characters")
    .required("Father's name is required"),
  mother_name: yup
    .string()
    .max(255, "Mother's name must be at most 255 characters")
    .required("Mother's name is required"),
  grandfather_name: yup
    .string()
    .max(255, "Grandfather's name must be at most 255 characters")
    .required("Grandfather's name is required"),
  phone_number: yup
    .string()
    .max(15, "Phone number must be at most 15 characters"),
  permanent_address: yup
    .string()
    .max(255, "Permanent address must be at most 255 characters")
    .required("Permanent address is required"),
  temporary_address: yup
    .string()
    .max(255, "Temporary address must be at most 255 characters")
    .required("Temporary address is required"),
  date_joined: yup.date().typeError("Date joined must be a valid date"),
});
const title = "Add User";
const endpoint = "/auth/users";

const AddUserFrom = () => {
  return (
    <BaseForm
      title={title}
      fields={fields}
      schema={schema}
      endpoint={endpoint}
    />
  );
};

export default AddUserFrom;
