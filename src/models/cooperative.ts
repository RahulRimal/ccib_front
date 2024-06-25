export type User = {
  idx: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  citizenship_number: string;
  citizenship_issued_place: string;
  citizenship_issued_date: string;
  dob: string;
  father_name: string;
  mother_name: string;
  grandfather_name: string;
  phone_number: number;
  gender: string;
  permanent_address: string;
  temporary_address: string;
};

export type Finance = {
  idx: string;
  name: string;
  parent?: string | null;
  email?: string | null;
  description: string;
  location?: { name: string };
  phone_number?: string | number;
  website_url?: string | null;
};

export type Loan = {
  idx: string;
  name: string;
  user: User;
  finance: Finance;
  account_number: string;
  loan_amount: number;
  total_paid: number;
  total_outstanding: number;
  loan_limit: number;
  interest_rate: number;
  overdue_amount: number;
  status: string;
  loan_nature: string;
  is_closed: boolean;
  installment_amount: number;
  utilization_percent: number | null;
  maturity_date: string;
};

export type Company = {
  idx: string;
  name: string;
  pan_num: number;
  vat_num: number;
  permanent_add: string;
  pan_registration_date: string;
  pan_registration_place: string;
  profiter: string | null;
  lone_taker_type: string;
};

export type LoanApplication = {
  idx: string;
  user: User;
  finance: Finance;
  loan_amount: number;
  status: string;
};

export type Inquirer = {
  idx: string;
  user: User;
  finance: Finance;
};

export type Inquiry = {
  idx: string;
  user: User;
  finance: Finance;
  reason: string;
  inquirer: Inquirer;
};

export type FinanceStaff = {
  idx: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  finance: Finance;
};

export type HigherPurchase = {
  idx: string;
  loan: Loan;
  type: string;
  description: string;
  ownership_type: string;
  coverage_percentage: number;
  nature_of_charge: string;
  latest_value: number;
  latest_valuation_date: string;
};

export type Installment = {
  idx: string;
  loan: Loan;
  due_date: string;
  paid_date: string;
  total_due: number;
  total_paid: number;
  total_outstanding: number;
};
