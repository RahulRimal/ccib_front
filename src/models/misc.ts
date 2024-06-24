export type Option = {
  label: string;
  value: string | number;
};

export type Input = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  basis: number;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
};

export type AdvanceFilter = {
  title: string;
  inputs: Input[];
};
