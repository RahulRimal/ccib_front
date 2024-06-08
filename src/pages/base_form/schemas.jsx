import * as yup from "yup";

export const inquirySchema = yup.object().shape({
  user: yup.string().required("User ID is required"),
  finance: yup.string().required("Finance ID is required"),
  reason: yup
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason can't be more than 500 characters")
    .required("Reason is required"),
  inquirer: yup.string().required("Inquirer User ID is required"),
});

export const loanSchema = yup.object().shape({
  user: yup.string().required("User is required"),
  finance: yup.string().required("Finance is required"),
  account_number: yup
    .string()
    .max(20, "Account number must be at most 20 characters")
    .required("Account number is required"),
  total_loan: yup
    .number()
    .positive("Total loan must be a positive number")
    .max(99999999.99, "Total loan must be at most 99,999,999.99")
    .required("Total loan is required"),
  total_paid: yup
    .number()
    .positive("Total paid must be a positive number")
    .max(99999999.99, "Total paid must be at most 99,999,999.99")
    .required("Total paid is required"),
  loan_limit: yup
    .number()
    .positive("Loan limit must be a positive number")
    .max(99999999.99, "Loan limit must be at most 99,999,999.99")
    .default(() => yup.ref("total_loan")),
  interest_rate: yup
    .number()
    .positive("Interest rate must be a positive number")
    .max(100.0, "Interest rate must be at most 100.00")
    .required("Interest rate is required"),
  overdue_amount: yup
    .number()
    .positive("Overdue amount must be a positive number")
    .max(99999999.99, "Overdue amount must be at most 99,999,999.99")
    .default(0.0),
  status: yup
    .string()
    .oneOf(
      ["good", "watchlist", "pass", "npl", "doubtful", "bad debt"],
      "Invalid status"
    )
    .default("good"),
  loan_type: yup
    .string()
    .oneOf(["term", "overdraft"], "Invalid loan type")
    .default("term"),
  is_closed: yup.boolean().default(false),
  utilization_percent: yup
    .number()
    .positive("Utilization percent must be a positive number")
    .max(100.0, "Utilization percent must be at most 100.00")
    .nullable(true),
});

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
export const securityDepositSchema = yup.object().shape({
  loan: yup.number().required("Loan is required"),
  type: yup
    .string()
    .oneOf(["real state", "fixed asset", "higher purchase"], "Invalid type")
    .required("Type is required"),
  description: yup.string().required("Description is required"),
  ownership_type: yup
    .string()
    .oneOf(["own", "third party"], "Invalid ownership type")
    .required("Ownership type is required"),
  coverage_percentage: yup
    .number()
    .min(0, "Coverage percentage must be at least 0")
    .max(100, "Coverage percentage must be at most 100")
    .required("Coverage percentage is required"),
  latest_value: yup
    .number()
    .min(0, "Latest value must be a positive number")
    .required("Latest value is required"),
  latest_valuation_date: yup
    .date()
    .required("Latest valuation date is required"),
});
export const loanApplicationSchema = yup.object().shape({
  user: yup.number().required("User is required"),
  loan_amount: yup.string().required("Loan amount is required"),
  finance: yup.number().required("Finance is required"),
  status: yup
    .string()
    .oneOf(["pending", "approved", "rejected"], "Invalid status")
    .required("Status is required"),
});
export const installementSchema = yup.object().shape({
  loan: yup.number().required("Loan is required"),
  due_date: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  paid_date: yup
    .date()
    .required("Paid date is required")
    .typeError("Invalid date format"),
  total_due: yup
    .number()
    .positive("Total due must be a positive number")
    .required("Total due is required"),
  total_paid: yup
    .number()
    .positive("Total paid must be a positive number")
    .required("Total paid is required"),
  total_outstanding: yup
    .number()
    .positive("Total outstanding must be a positive number")
    .required("Total outstanding is required"),
});

export const blacklistSchema = yup.object().shape({
  user: yup.string().required("User is required"),
  finance: yup.string().required("Finance is required"),
  category: yup
    .string()
    .oneOf(["borrower", "guarantor"], "Invalid category")
    .required("Category is required"),
  reason: yup
    .string()
    .max(500, "Reason cannot exceed 500 characters")
    .required("Reason is required"),
  remarks: yup.string(),
  status: yup
    .string()
    .oneOf(["blacklisted", "relished"], "Invalid status")
    .required("Status is required"),
  release_date: yup.date(),
  report_date: yup.date().required("Report date is required"),
});

export const blacklistReportSchema = yup.object().shape({
  user: yup.number().required("User is required"),
  finance: yup.number().required("Finance is required"),
  status: yup
    .string()
    .oneOf(["progress", "rejected", "approved"], "Invalid status")
    .required("Status is required"),
});
