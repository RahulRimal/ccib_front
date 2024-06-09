import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { TbUserHexagon } from "react-icons/tb";
import ImageInput from "../components/Forms/Fields/ImageInput";
import { RxSwitch } from "react-icons/rx";
import InputField from "../components/Forms/Fields/InputField";
import Button from "../components/Button";

const setting = [
  {
    id: 1,
    title: "Profile",
    active: false,
  },
  {
    id: 2,
    title: "Company Details",
    active: true,
  },
  {
    id: 3,
    title: "Loan Application",
    active: false,
  },
];

const SectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: 0 ${({ theme }) => theme.spacing.s12};
  margin-bottom: ${({ theme }) => theme.spacing.s16};
`;

const ButtonWrapper = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  padding: ${({ theme }) => theme.spacing.s20} 0;
  &.active {
    color: ${({ theme }) => theme.palette.success.main};
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.success.main};
    }
  }
`;

const SectionHeading = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.f18};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing.s20};
`;

const FormInputField = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 1%;
  row-gap: ${({ theme }) => theme.spacing.s8};
  position: relative;
  flex-wrap: wrap;
  & > div {
    min-width: 30%;
    flex: 1;
    input {
      background-color: ${({ theme }) => theme.palette.background.dark};
      height: ${({ theme }) => theme.sizing.s52};
    }
  }
`;

function EmployeeProfile() {
  const theme = useTheme();

  const [profile, setProfile] = useState(setting);

  const handleTab = (id) => {
    setProfile(profile.map((item) => ({ ...item, active: item.id === id })));
  };
  return (
    <div style={{ padding: theme.spacing.s12 }}>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.s8,
            paddingBottom: theme.spacing.s16,
          }}
        >
          <TbUserHexagon
            className="icon"
            style={{ height: theme.sizing.s24, width: theme.sizing.s24 }}
          />
          <strong>Profile Settings</strong>
        </div>
        <SectionWrapper style={{ display: "flex", gap: theme.spacing.s24 }}>
          {profile.map((item, index) => (
            <ButtonWrapper
              key={index}
              className={item.active ? "active" : ""}
              onClick={() => handleTab(item.id)}
            >
              {item.title}
            </ButtonWrapper>
          ))}
        </SectionWrapper>
        {profile[0].active && (
          <SectionWrapper
            style={{ padding: `${theme.spacing.s16} ${theme.spacing.s12}` }}
          >
            <SectionHeading>Your Profile</SectionHeading>
            <form
              action=""
              style={{ padding: `${theme.spacing.s16} ${theme.spacing.s0}` }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  gap: theme.spacing.s20,
                }}
              >
                <ImageInput />
                <div>
                  <h3 style={{ paddingBottom: theme.spacing.s8 }}>
                    Jeevan Shrestha
                  </h3>
                  <p style={{ color: theme.palette.text.secondary }}>
                    shresthaj1986@gmail.com
                  </p>
                </div>
              </div>
              <SectionHeading style={{ marginTop: theme.spacing.s24 }}>
                Personal Details
              </SectionHeading>
              <FormInputField>
                <InputField
                  title="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  label="First Name"
                  required={true}
                  editable={false}
                  value="John"
                />
                <InputField
                  title="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  label="Last Name"
                  required={true}
                  editable={false}
                  value="Doe"
                />
                <InputField
                  title="Employee ID"
                  name="empId"
                  type="number"
                  placeholder="Employee ID"
                  label="Employee ID"
                  required={true}
                  editable={false}
                  value="12345"
                />
                <InputField
                  title="Citizenship ID"
                  name="ctyId"
                  type="text"
                  placeholder="Citizenship ID"
                  label="Citizenship ID"
                  required={true}
                  editable={false}
                  value="1-23-4567"
                />
                <InputField
                  title="Department"
                  name="department"
                  type="text"
                  placeholder="Department"
                  label="Department"
                  required={true}
                  editable={false}
                  value="Engineering"
                />
                <InputField
                  title="Position"
                  name="position"
                  type="text"
                  placeholder="Position"
                  label="Position"
                  required={true}
                  editable={false}
                  value="Software Engineer"
                />
                <InputField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                  required={true}
                  editable={false}
                  value="john.doe@example.com"
                />
                <InputField
                  title="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  label="Phone Number"
                  required={true}
                  editable={false}
                  value="123-456-7890"
                />
                <InputField
                  title="Date of Birth"
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  label="Date of Birth"
                  required={true}
                  editable={false}
                  value="1990-01-01"
                />
                <InputField
                  title="Address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  label="Address"
                  required={true}
                  editable={false}
                  value="123 Main Street"
                />
                <InputField
                  title="City"
                  name="city"
                  type="text"
                  placeholder="City"
                  label="City"
                  required={true}
                  editable={false}
                  value="Anytown"
                />
                <InputField
                  title="State"
                  name="state"
                  type="text"
                  placeholder="State"
                  label="State"
                  required={true}
                  editable={false}
                  value="NY"
                />
                <InputField
                  title="Postal Code"
                  name="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  label="Postal Code"
                  required={true}
                  editable={false}
                  value="10001"
                />
                <InputField
                  title="Country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  label="Country"
                  required={true}
                  editable={false}
                  value="USA"
                />
                <InputField
                  title="Date Hired"
                  name="dateHired"
                  type="date"
                  placeholder="Date Hired"
                  label="Date Hired"
                  required={true}
                  editable={false}
                  value="2020-01-01"
                />
                <InputField
                  title="Salary"
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  label="Salary"
                  required={true}
                  editable={false}
                  value="80000"
                />
                <InputField
                  title="Manager"
                  name="manager"
                  type="text"
                  placeholder="Manager"
                  label="Manager"
                  required={true}
                  editable={false}
                  value="Jane Smith"
                />
                <InputField
                  title="Employment Status"
                  name="employmentStatus"
                  type="text"
                  placeholder="Employment Status"
                  label="Employment Status"
                  required={true}
                  editable={false}
                  value="Full-Time"
                />
                <InputField
                  title="Work Hours"
                  name="workHours"
                  type="text"
                  placeholder="Work Hours"
                  label="Work Hours"
                  required={true}
                  editable={false}
                  value="40"
                />
                <InputField
                  title="Bank Account Number"
                  name="bankAccount"
                  type="text"
                  placeholder="Bank Account Number"
                  label="Bank Account Number"
                  required={true}
                  editable={false}
                  value="1234567890"
                />
              </FormInputField>

              <Button
                text={"Add New Details"}
                style={{
                  height: theme.sizing.s44,
                  padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
                  marginTop: theme.spacing.s16,
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            </form>
          </SectionWrapper>
        )}
        {profile[1].active && (
          <SectionWrapper
            style={{ padding: `${theme.spacing.s16} ${theme.spacing.s12}` }}
          >
            <SectionHeading>Company Profile</SectionHeading>
            <form
              action=""
              style={{ padding: `${theme.spacing.s16} ${theme.spacing.s0}` }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  gap: theme.spacing.s20,
                }}
              >
                <ImageInput />
                <div>
                  <h3 style={{ paddingBottom: theme.spacing.s8 }}>
                    Hamro Ramro Finance Pvt. Ltd.
                  </h3>
                  <p style={{ color: theme.palette.text.secondary }}>
                    hamroramro@gmial.com.np
                  </p>
                </div>
              </div>
              <SectionHeading style={{ marginTop: theme.spacing.s24 }}>
                Company Details
              </SectionHeading>
              <FormInputField>
                <InputField
                  title="Company Name"
                  name="companyName"
                  type="text"
                  placeholder="Company Name"
                  label="Company Name"
                  required={true}
                  editable={false}
                  value="Hamro Ramro Finance Pvt. Ltd."
                />
                <InputField
                  title="Company ID"
                  name="companyId"
                  type="number"
                  placeholder="Company ID"
                  label="Company ID"
                  required={true}
                  editable={false}
                  value="12345678"
                />
                <InputField
                  title="Branch"
                  name="branch"
                  type="text"
                  placeholder="branch"
                  label="branch"
                  required={true}
                  editable={false}
                  value="Maitidevi Branch"
                />
                <InputField
                  title="Location"
                  name="location"
                  type="text"
                  placeholder="Location"
                  label="Location"
                  required={true}
                  editable={false}
                  value="123 Business St, Business City"
                />
                <InputField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                  required={true}
                  editable={false}
                  value="contact@company.com"
                />
                <InputField
                  title="Phone Number"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  label="Phone Number"
                  required={true}
                  editable={false}
                  value="123-456-7890"
                />
                <InputField
                  title="Website"
                  name="website"
                  type="url"
                  placeholder="Website"
                  label="Website"
                  required={true}
                  editable={false}
                  value="https://www.company.com"
                />
                <InputField
                  title="Industry"
                  name="industry"
                  type="text"
                  placeholder="Finance"
                  label="Finance"
                  required={true}
                  editable={false}
                  value="Finance"
                />
                <InputField
                  title="Number of Employees"
                  name="numEmployees"
                  type="number"
                  placeholder="Number of Employees"
                  label="Number of Employees"
                  required={true}
                  editable={false}
                  value="500"
                />
                <InputField
                  title="Date Established"
                  name="dateEstablished"
                  type="date"
                  placeholder="Date Established"
                  label="Date Established"
                  required={true}
                  editable={false}
                  value="2000-01-01"
                />
                <InputField
                  title="Business Type"
                  name="businessType"
                  type="text"
                  placeholder="Business Type"
                  label="Business Type"
                  required={true}
                  editable={false}
                  value="LLC"
                />
                <InputField
                  title="Revenue"
                  name="revenue"
                  type="number"
                  placeholder="Revenue"
                  label="Revenue"
                  required={true}
                  editable={false}
                  value="5000000"
                />
              </FormInputField>
            </form>
          </SectionWrapper>
        )}
        {profile[0].active && (
          <div style={{ display: "flex", gap: theme.spacing.s12 }}>
            <Button
              text={"Save Changes"}
              style={{
                height: theme.sizing.s44,
                padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
              }}
            />
            <Button
              text={"Cancel"}
              style={{
                height: theme.sizing.s44,
                padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default EmployeeProfile;
