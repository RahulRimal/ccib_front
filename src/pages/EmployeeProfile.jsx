import styled, { useTheme } from "styled-components";
import { useState } from "react";
import { TbUserHexagon } from "react-icons/tb";
import ImageInput from "../components/Forms/ImageInput";
import { RxSwitch } from "react-icons/rx";
import InputField from "../components/Forms/InputField";
import Button from "../components/Button";

const setting = [
  {
    id: 1,
    title: "Profile",
    class: "active",
  },
  {
    id: 2,
    title: "Company Loan",
  },
  {
    id: 3,
    title: "Loan Application",
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
  padding: ${({ theme }) => theme.spacing.s20} 0;
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.f16};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  &.active {
    color: ${({ theme }) => theme.palette.success.main};
    border-bottom: 3px solid ${({ theme }) => theme.palette.success.main};
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
    min-width: 49%;
    flex: 1;
    input {
      background-color: ${({ theme }) => theme.palette.background.dark};
      height: ${({ theme }) => theme.sizing.s52};
    }
  }
`;

function EmployeeProfile() {
  const [away, setAway] = useState(false);
  const theme = useTheme();
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
          {setting.map((item, index) => (
            <ButtonWrapper key={index} className={item.class}>
              {item.title}
            </ButtonWrapper>
          ))}
        </SectionWrapper>
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
              <div
                style={{
                  position: "absolute",
                  right: theme.spacing.s12,
                  textAlign: "right",
                }}
              >
                {!away ? (
                  <RxSwitch
                    style={{
                      height: theme.sizing.s36,
                      width: theme.sizing.s36,
                      cursor: "pointer",
                      transform: "rotate(180deg)",
                    }}
                    onClick={() => setAway(true)}
                  />
                ) : (
                  <RxSwitch
                    style={{
                      height: theme.sizing.s36,
                      width: theme.sizing.s36,
                      cursor: "pointer",
                    }}
                    onClick={() => setAway(false)}
                  />
                )}
                <p
                  style={{
                    fontSize: theme.typography.fontSize.f14,
                    fontWeight: theme.typography.fontWeight.semiBold,
                  }}
                >
                  Show me as away
                </p>
              </div>
            </div>
            <SectionHeading style={{ marginTop: theme.spacing.s24 }}>
              Personal Details
            </SectionHeading>
            <FormInputField>
              <InputField
                title={"Name"}
                name={"firstName"}
                type={"text"}
                placeholder={"First Name"}
                label={"First Name"}
                required={true}
                editable={false}
                value={"Jeevan Shrestha"}
              />
              <InputField
                title={"Employee Id"}
                name={"empId"}
                type={"number"}
                placeholder={"Employee Id"}
                label={"First Name"}
                required={true}
                editable={false}
                value={"00012312"}
              />
              <InputField
                title={"Location"}
                name={"location"}
                type={"text"}
                placeholder={"location"}
                label={"Location"}
                required={true}
                editable={false}
                value={"Budhanilkantha-13, Chunikhel"}
              />
              <InputField
                title={"Email"}
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                label={"Email"}
                required={true}
                editable={false}
                value={"abcd87@gmail.com"}
              />

              <InputField
                title={"Phone Number"}
                name={"pohone"}
                type={"number"}
                placeholder={"Phone Number"}
                label={"Phone no."}
                required={true}
                editable={false}
                value={"9874673372"}
              />

              <InputField
                title={"Date of Birth"}
                name={"dob"}
                type={"date"}
                placeholder={"Date of Birth"}
                label={"DOB"}
                required={true}
                editable={false}
                value={"2000-01-01"}
              />
            </FormInputField>
            <Button
              text={"Save Changes"}
              style={{
                height: theme.sizing.s44,
                padding: `${theme.spacing.s0} ${theme.spacing.s32}`,
                marginTop: theme.spacing.s16,
              }}
            />
          </form>
        </SectionWrapper>
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
      </main>
    </div>
  );
}

export default EmployeeProfile;
