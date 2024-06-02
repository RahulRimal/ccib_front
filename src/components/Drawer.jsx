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

import { IoMenu, IoPersonSharp } from "react-icons/io5";
import { drawerMinWidth } from "../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsersSlash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Divider from "./Divider";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  border-right: 1px solid ${({ theme }) => theme.palette.border.primary};
  transition: width 0.3s ease;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - ${({ theme }) => theme.sizing.s52});
`;

const Drawer = ({ drawerWidth }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Wrapper style={{ width: drawerWidth }}>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem
              prefix={<LuLayoutDashboard />}
              text="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <ListItem prefix={<MdPeople />} />
            <ListItem prefix={<FaUsersSlash />} />
            <ListItem prefix={<MdCreditCard />} />
            <ListItem prefix={<MdCreditScore />} />
            <ListItem prefix={<MdOutlineCreditCardOff />} />
          </>
        ) : (
          <>
            <ListItem
              prefix={<LuLayoutDashboard />}
              text="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <ListItem
              prefix={<MdPeople />}
              text="Users"
              onClick={() => navigate("/")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              text="Applications"
              onClick={() => navigate("/loan-application")}
            />
            <Divider />
            <ListItem
              prefix={<MdCreditCard />}
              text="Loans"
              onClick={() => navigate("/loans")}
            />
            <ListItem
              prefix={<MdCreditScore />}
              text="Finances"
              suffix={<FaAngleDown />}
              onClick={() => navigate("/finance")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Companies"
              onClick={() => navigate("/company")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Report"
              onClick={() => navigate("/report")}
            />
          </>
        )}
      </ul>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem prefix={<MdOutlineSettings />} />
            <ListItem prefix={<MdOutlinePrivacyTip />} />
            <Divider />
            <ListItem prefix={<MdExitToApp />} />
          </>
        ) : (
          <>
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
