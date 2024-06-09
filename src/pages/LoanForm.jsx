import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "../components/Button";
import InputField from "../components/Forms/Fields/InputField";

const MainWrapper = styled.div`
  display: block;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.s16};
`;
const InputWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
`;
const GuarantorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const GuarantorHeading = styled.p`
  margin-top: 20px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: semibold;
`;
const userFields = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    required: true,
  },
  {
    name: "middleName",
    type: "text",
    label: "Middle Name",
    required: true,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    required: true,
  },
  {
    name: "age",
    type: "number",
    label: "Age",
    required: true,
  },
  {
    name: "citizenshipNo",
    type: "number",
    label: "Citizenship Number",
    required: true,
  },
  {
    name: "citizenshipIssuePlace",
    type: "text",
    label: "Citizenship Issued Place",
    required: true,
  },
  {
    name: "citizenshipIssueDate",
    type: "date",
    label: "Citizenship Issued Date",
    required: true,
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    required: true,
  },
  {
    name: "fatherName",
    type: "text",
    label: "Father Name",
    required: true,
  },
  {
    name: "phoneNumber",
    type: "number",
    label: "Phone Number",
    required: true,
  },
  {
    name: "tempAddress",
    type: "text",
    label: "Temporary Address",
    required: true,
  },
  {
    name: "permanentAddress",
    type: "text",
    label: "Permanent Address",
    required: true,
  },
];
const companyFields = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    required: true,
  },
  {
    name: "middleName",
    type: "text",
    label: "Middle Name",
    required: true,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    required: true,
  },
  {
    name: "age",
    type: "number",
    label: "Age",
    required: true,
  },
  {
    name: "citizenshipNo",
    type: "number",
    label: "Citizenship Number",
    required: true,
  },
  {
    name: "citizenshipIssuePlace",
    type: "text",
    label: "Citizenship Issued Place",
    required: true,
  },
  {
    name: "citizenshipIssueDate",
    type: "date",
    label: "Citizenship Issued Date",
    required: true,
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    required: true,
  },
  {
    name: "fatherName",
    type: "text",
    label: "Father Name",
    required: true,
  },
  {
    name: "phoneNumber",
    type: "number",
    label: "Phone Number",
    required: true,
  },
  {
    name: "tempAddress",
    type: "text",
    label: "Temporary Address",
    required: true,
  },
  {
    name: "permanentAddress",
    type: "text",
    label: "Permanent Address",
    required: true,
  },
];
function LoanForm() {
  const theme = useTheme();
  const [isPersonal, setIsPersonal] = React.useState(true);

  const [numGuarantors, setNumGuarantors] = useState({
    user: 1,
    company: 1,
  });

  const handleAddGuarantor = ({ type }) => {
    setNumGuarantors((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  return (
    <MainWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: theme.spacing.s12,
        }}
      >
        <Button
          style={{
            width: "100%",
            backgroundColor: !isPersonal && theme.palette.disabled.button,
            color: !isPersonal && theme.palette.text.primary,
            transition: "background-color 0.3s ease",
          }}
          text="Personal Loan"
          onClick={() => setIsPersonal(true)}
        />
        <Button
          style={{
            width: "100%",
            backgroundColor: isPersonal && theme.palette.disabled.button,
            color: isPersonal && theme.palette.text.primary,
            transition: "background-color 0.3s ease",
          }}
          text="Company Loan"
          onClick={() => setIsPersonal(false)}
        />
      </div>

      <form style={{ display: "flex", flexDirection: "column" }}>
        {isPersonal && (
          <InputWrapper>
            {userFields.map((field, idx) => (
              <InputField
                key={idx}
                name={field.name}
                placeholder={field.label}
                type={field.type}
                label={field.label}
                required={field.required}
              />
            ))}
          </InputWrapper>
        )}
        {isPersonal && (
          <GuarantorWrapper>
            <GuarantorHeading>Gurantor Info</GuarantorHeading>
            {[...Array(numGuarantors.user)].map((_, guarantorIdx) => (
              <React.Fragment key={guarantorIdx}>
                <p
                  style={{
                    marginTop: theme.spacing.s8,
                    color: theme.palette.text.primary,
                    fontSize: theme.typography.fontSize.f14,
                  }}
                >
                  Gurantor {guarantorIdx + 1}
                </p>
                <InputWrapper>
                  {userFields.map((field, idx) => (
                    <InputField
                      key={`${field.name}-${guarantorIdx}`}
                      name={`${field.name}-${guarantorIdx}`}
                      type={field.type}
                      placeholder={field.label}
                      label={field.label}
                      required={field.required}
                    />
                  ))}
                </InputWrapper>
              </React.Fragment>
            ))}
          </GuarantorWrapper>
        )}
        {!isPersonal && (
          <InputWrapper>
            {companyFields.map((field, idx) => (
              <InputField
                key={idx}
                name={field.name}
                type={field.type}
                placeholder={field.label}
                label={field.label}
                required={field.required}
              />
            ))}
          </InputWrapper>
        )}
        {!isPersonal && (
          <GuarantorWrapper>
            <GuarantorHeading>Gurantor Info</GuarantorHeading>
            {[...Array(numGuarantors.company)].map((_, guarantorIdx) => (
              <React.Fragment key={guarantorIdx}>
                <p
                  style={{
                    marginTop: theme.spacing.s8,
                    color: theme.palette.text.primary,
                    fontSize: theme.typography.fontSize.f14,
                  }}
                >
                  Gurantor {guarantorIdx + 1}
                </p>
                <InputWrapper>
                  {companyFields.map((field, idx) => (
                    <InputField
                      key={`${field.name}-${guarantorIdx}`}
                      name={`${field.name}-${guarantorIdx}`}
                      type={field.type}
                      placeholder={field.label}
                      label={field.label}
                      required={field.required}
                    />
                  ))}
                </InputWrapper>
              </React.Fragment>
            ))}
          </GuarantorWrapper>
        )}
        {(isPersonal || !isPersonal) && (
          <div style={{ display: "flex", gap: theme.spacing.s12 }}>
            <Button
              type={"button"}
              text={"Add Guarantor"}
              width={"fit-content"}
              onClick={() =>
                handleAddGuarantor({
                  type: (!isPersonal && "company") || (isPersonal && "user"),
                })
              }
            />
            <Button
              type={"button"}
              text={"Add User"}
              width={"fit-content"}
              onClick={handleAddGuarantor}
            />
          </div>
        )}
      </form>
    </MainWrapper>
  );
}
export default LoanForm;
