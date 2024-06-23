import React from "react";
import styled, { useTheme } from "styled-components";
import ListItem from "./ListItem";
import {
  MdCreditCard,
  MdCreditScore,
  MdExitToApp,
  MdOutlineCreditCardOff,
  MdOutlinePrivacyTip,
  MdOutlineSettings,
  MdPeople,
} from "react-icons/md";


import { drawerMinWidth } from "../(root)/layout";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsersSlash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { TbUserHexagon } from "react-icons/tb";

import Divider from "./Divider";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  border-right: 1px solid ${({ theme }) => theme.palette.border.primary};
  transition: width 0.3s ease;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - ${({ theme }) => theme.sizing.s52});
  position: sticky;
  z-index: 9;
  top: ${({ theme }) => theme.spacing.s52};
  left: ${({ theme }) => theme.spacing.s0};
`;

const Drawer = ({ drawerWidth }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper style={{ width: drawerWidth }}>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem
              prefix={<LuLayoutDashboard />}
              onClick={() => router.push("/dashboard")}
            />
            <ListItem prefix={<MdPeople />} onClick={() => router.push("/")} />
            <ListItem
              prefix={<FaUsersSlash />}
              onClick={() => router.push("/loan-application")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              onClick={() => router.push("/report")}
            />
            <Divider />
            <ListItem
              prefix={<MdCreditCard />}
              onClick={() => router.push("/loans")}
            />
            <ListItem
              prefix={<MdCreditScore />}
              onClick={() => router.push("/finance")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              onClick={() => router.push("/company")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              onClick={() => router.push("/add")}
            />
          </>
        ) : (
          <>
            <ListItem
              prefix={<LuLayoutDashboard />}
              text="Dashboard"
              onClick={() => router.push("/")}
            />
            <ListItem
              prefix={<MdPeople />}
              text="Users"
              onClick={() => router.push("/users")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              text="Applications"
              onClick={() => router.push("/loan-application")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              text="Report"
              onClick={() => router.push("/report")}
            />
            <Divider />
            <ListItem
              prefix={<MdCreditCard />}
              text="Loans"
              onClick={() => router.push("/loans")}
            />
            <ListItem
              prefix={<MdCreditScore />}
              text="Finances"
              suffix={<FaAngleDown />}
              onClick={() => router.push("/finance")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Companies"
              onClick={() => router.push("/company")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Report"
              onClick={() => router.push("/report")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Forms"
              onClick={() => router.push("/add")}
            />
          </>
        )}
      </ul>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem
              prefix={<TbUserHexagon onClick={() => router.push("/profile")} />}
            />
            <ListItem prefix={<MdOutlineSettings />} />
            <ListItem prefix={<MdOutlinePrivacyTip />} />
            <Divider />
            <ListItem prefix={<MdExitToApp />} />
          </>
        ) : (
          <>
            <ListItem
              prefix={<TbUserHexagon />}
              text="Profile"
              onClick={() => router.push("/profile")}
            />
            <ListItem prefix={<MdOutlineSettings />} text="Settings" />
            <ListItem
              prefix={<MdOutlinePrivacyTip />}
              text="Security and Privacy"
            />
            <Divider />
            <ListItem
              prefix={
                <Button
                  icon={
                    <MdExitToApp
                      style={{ fontSize: theme.typography.fontSize.f20 }}
                    />
                  }
                />
              }
              text="Log Out"
            />
          </>
        )}
      </ul>
    </Wrapper>
  );
};

export default Drawer;
