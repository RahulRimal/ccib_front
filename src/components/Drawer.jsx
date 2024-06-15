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

import { drawerMinWidth } from "../App";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsersSlash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { TbUserHexagon } from "react-icons/tb";

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
  position: sticky;
  z-index: 9;
  top: ${({ theme }) => theme.spacing.s52};
  left: ${({ theme }) => theme.spacing.s0};
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
              onClick={() => navigate("/dashboard")}
            />
            <ListItem prefix={<MdPeople />} onClick={() => navigate("/")} />
            <ListItem
              prefix={<FaUsersSlash />}
              onClick={() => navigate("/loan-application")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              onClick={() => navigate("/report")}
            />
            <Divider />
            <ListItem
              prefix={<MdCreditCard />}
              onClick={() => navigate("/loans")}
            />
            <ListItem
              prefix={<MdCreditScore />}
              onClick={() => navigate("/finance")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              onClick={() => navigate("/company")}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              onClick={() => navigate("/add")}
            />
          </>
        ) : (
          <>
            <ListItem
              prefix={<LuLayoutDashboard />}
              text="Dashboard"
              onClick={() => navigate("/")}
            />
            <ListItem
              prefix={<MdPeople />}
              text="Users"
              onClick={() => navigate("/users")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              text="Applications"
              onClick={() => navigate("/loan-application")}
            />
            <ListItem
              prefix={<FaUsersSlash />}
              text="Report"
              onClick={() => navigate("/report")}
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
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Forms"
              onClick={() => navigate("/add")}
            />
          </>
        )}
      </ul>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem
              prefix={<TbUserHexagon onClick={() => navigate("/profile")} />}
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
              onClick={() => navigate("/profile")}
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
