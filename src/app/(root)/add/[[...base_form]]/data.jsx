// import InquiryForm from "../../components/Forms/InquiryForm";
// import LoanAccountForm from "../../components/Forms/LoanAccountForm";
// import {
//   blacklistReportSchema,
//   blacklistSchema,
//   companySchema,
//   financeSchema,
//   inquirySchema,
//   installementSchema,
//   loanApplicationSchema,
//   loanSchema,
//   securityDepositSchema,
// } from "./schemas";
// ;

// export const companyFormFields = [
//   {
//     label: "Name",
//     name: "name",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 255,
//     placeholder: "Enter Company Name",
//   },
//   {
//     label: "PAN Number",
//     name: "pan_num",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 9,
//     placeholder: "Enter PAN Number",
//   },
//   {
//     label: "VAT Number",
//     name: "vat_num",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 9,
//     placeholder: "Enter VAT Number",
//   },
//   {
//     label: "Permanent Address",
//     name: "permanent_add",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 255,
//     placeholder: "Enter Permanent Address",
//   },
//   {
//     label: "PAN Registration Date",
//     name: "pan_registration_date",
//     type: "date",
//     required: true,
//     defaultValue: "",
//     placeholder: "Enter PAN Registration Date",
//   },
//   {
//     label: "PAN Registration Place",
//     name: "pan_registration_place",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 100,
//     placeholder: "Enter PAN Registration Place",
//   },
//   {
//     label: "Profiter",
//     name: "profiter",
//     type: "number",
//     required: false,
//     defaultValue: "",
//     placeholder: "Enter Profiter User ID",
//   },
//   {
//     label: "Lone Taker Type",
//     name: "lone_taker_type",
//     type: "select",
//     options: [
//       { value: "personal", label: "Personal" },
//       { value: "company", label: "Company" },
//     ],
//     required: true,
//     defaultValue: "company",
//   },
// ];
// const financeFormFields = [
//   {
//     label: "Name",
//     name: "name",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 100,
//     placeholder: "Enter Finance Name",
//   },
//   {
//     label: "Parent",
//     name: "parent",
//     type: "number",
//     required: false,
//     defaultValue: "",
//     placeholder: "Enter Parent Finance ID",
//   },
//   {
//     label: "Description",
//     name: "description",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 1000,
//     placeholder: "Enter Description",
//   },
//   {
//     label: "Location",
//     name: "location",
//     type: "json",
//     required: false,
//     defaultValue: {},
//     placeholder: "Enter Location JSON",
//   },
//   {
//     label: "Email",
//     name: "email",
//     type: "email",
//     required: false,
//     defaultValue: "",
//     placeholder: "Enter Email",
//   },
//   {
//     label: "Phone Number",
//     name: "phone_number",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     maxLength: 15,
//     placeholder: "Enter Phone Number",
//   },
//   {
//     label: "Website URL",
//     name: "website_url",
//     type: "url",
//     required: false,
//     defaultValue: "",
//     placeholder: "Enter Website URL",
//   },
// ];
// ;
// export const blacklistReportFields = [
//   {
//     label: "User",
//     name: "user",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     placeholder: "Enter User ID",
//   },
//   {
//     label: "Finance",
//     name: "finance",
//     type: "text",
//     required: true,
//     defaultValue: "",
//     placeholder: "Enter Finance ID",
//   },
//   {
//     label: "Status",
//     name: "status",
//     type: "select",
//     options: [
//       { value: "progress", label: "Progress" },
//       { value: "rejected", label: "Rejected" },
//       { value: "approved", label: "Approved" },
//     ],
//     required: true,
//     defaultValue: "progress",
//     placeholder: "Select Status",
//   },
// ];

import InquiryForm from "../components/InquiryForm";
import LoanAccountForm from "../components/LoanAccountForm";
import LoanApplicationForm from "../components/LoanApplicationForm";
import InstallmentForm from "../components/InstallmentForm";
import BlackListForm from "../components/BlackListForm";
import SecurityDepositForm from "../components/SecurityDeposit";
import BlackListApplicationForm from "../components/BlackListApplicationForm";
import AddUserFrom from "../components/AddUserForm";

export const formTabs = [
  {
    id: 1,
    key: "inquiry_form",
    title: "Inquiry",
    active: true,
    Component: InquiryForm,
  },
  {
    id: 2,
    key: "loan_account",
    title: "Loan Account",
    active: false,
    Component: LoanAccountForm,
  },
  /* {
    id: 4,
    title: "Blacklist",
    active: false,
    Component: BlackListForm,
  }, */
  {
    id: 5,
    key: "security_deposit",
    title: "Security Deposit",
    active: false,
    Component: SecurityDepositForm,
  },
  {
    id: 6,
    key: "loan_application",
    title: "Loan Application",
    active: false,
    Component: LoanApplicationForm,
  },
  {
    id: 7,
    key: "installment",
    title: "Installment",
    active: false,
    Component: InstallmentForm,
  },
  {
    id: 8,
    key: "users",
    title: "Add Users",
    active: false,
    Component: AddUserFrom,
  },
  /* {
    id: 9,
    title: "Blacklist Application",
    active: false,
    Component: BlackListApplicationForm,
  }, */
];
