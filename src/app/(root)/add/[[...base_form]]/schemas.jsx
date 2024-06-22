import * as yup from "yup";

export const companySchema = yup.object().shape({
  name: yup
    .string()
    .max(255, "Name must be at most 255 characters")
    .required("Name is required"),
  pan_num: yup
    .string()
    .max(9, "PAN number must be 9 characters")
    .nullable(true),
  vat_num: yup
    .string()
    .max(9, "VAT number must be 9 characters")
    .nullable(true),
  permanent_add: yup
    .string()
    .max(255, "Permanent address must be at most 255 characters")
    .required("Permanent address is required"),
  pan_registration_date: yup
    .date()
    .nullable(true)
    .typeError("Invalid date format"),
  pan_registration_place: yup
    .string()
    .max(100, "PAN registration place must be at most 100 characters")
    .nullable(true),
  profiter: yup.number().nullable(true),
  lone_taker_type: yup
    .string()
    .oneOf(["personal", "company"], "Invalid lone taker type")
    .default("company"),
});
export const financeSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  parent: yup.number().nullable(),
  description: yup
    .string()
    .max(1000, "Description must be at most 1000 characters")
    .required("Description is required"),
  location: yup
    .object()
    .shape({
      // Define your location object validation here, example:
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      zip: yup.string().required("Zip is required"),
    })
    .required("Location is required"),
  email: yup.string().email("Invalid email format").nullable(),
  phone_number: yup
    .string()
    .max(15, "Phone number must be at most 15 characters")
    .required("Phone number is required"),
  website_url: yup.string().url("Invalid URL format").nullable(),
});


export const blacklistReportSchema = yup.object().shape({
  user: yup.number().required("User is required"),
  finance: yup.number().required("Finance is required"),
  status: yup
    .string()
    .oneOf(["progress", "rejected", "approved"], "Invalid status")
    .required("Status is required"),
});
