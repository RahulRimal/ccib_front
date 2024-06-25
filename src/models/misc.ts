export type Option = {
  label: string;
  value: string | number | boolean;
};

export type Input = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  basis: number;
  options: Option[];
  defaultValue: string | number | null;
  placeholder?: string;
};

export type AdvanceFilter = {
  title: string;
  inputs: Input[];
};

export type FormFields = {
  label: string;
  labels?: string;
  name: string;
  type: string;
  maxLength?: number;
  step?: string;
  required?: boolean;
  options?: Option[];
  defaultValue?: string | number;
  placeholder?: string;
};
