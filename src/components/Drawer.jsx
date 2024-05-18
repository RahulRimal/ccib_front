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
import { FaUsersSlash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Divider from "./Divider";
import Button from "./Button";

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
  return (
    <Wrapper style={{ width: drawerWidth }}>
      <ul style={{ padding: 0, margin: 0 }}>
        {drawerWidth === drawerMinWidth ? (
          <>
            <ListItem prefix={<MdPeople />} />
            <ListItem prefix={<FaUsersSlash />} />
            <ListItem prefix={<MdCreditCard />} />
            <ListItem prefix={<MdCreditScore />} />
            <ListItem prefix={<MdOutlineCreditCardOff />} />
          </>
        ) : (
          <>
            <ListItem prefix={<MdPeople />} text="Users" />
            <ListItem prefix={<FaUsersSlash />} text="Blacklisted Users" />
            <Divider />
            <ListItem prefix={<MdCreditCard />} text="Loans" />
            <ListItem
              prefix={<MdCreditScore />}
              text="Healthy Loans"
              suffix={<FaAngleDown />}
            />
            <ListItem
              prefix={<MdOutlineCreditCardOff />}
              text="Defaulted Loans"
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
