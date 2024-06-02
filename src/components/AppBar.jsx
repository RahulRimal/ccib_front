import React, { useState } from "react";
import styled from "styled-components";
import { IoPersonSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import IconButton from "./IconButton";
import Menu, { MenuItem } from "./Menu";
import Badge from "./Badge";
import SearchBar from "./SearchBar";
import { drawerMaxWidth, drawerMinWidth } from "../App";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const AppbarWrapper = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s4};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.primary.main};
  transition: width 0.3s ease;
  z-index: 99;

  .icon {
    font-size: 30px;
    color: ${({ theme }) => theme.palette.icon.main};
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  transition: width 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};
`;

const AppBar = ({ drawerWidth, toggleDrawer, toggleTheme }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        height: theme.sizing.s52,
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <DrawerHeader
        style={{
          width: drawerWidth === drawerMaxWidth ? drawerWidth : 0,
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", padding: theme.spacing.s8 }}
        >
          <h1>CCIB</h1>
        </Link>
        <IconButton onClick={toggleDrawer} showBgOnHover={false}>
          <IoIosArrowBack style={{ fontSize: theme.typography.fontSize.f30 }} />
        </IconButton>
      </DrawerHeader>
      <AppbarWrapper
        style={{
          width:
            drawerWidth === drawerMaxWidth
              ? `calc(100% - ${drawerWidth}px)`
              : "100%",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.s8,
          }}
        >
          {drawerWidth === drawerMinWidth && (
            <IconButton onClick={toggleDrawer}>
              <TiThMenu className="icon" />
            </IconButton>
          )}
          <SearchBar
            inputStyle={{ color: theme.palette.common.white }}
            placeholder={"Search..."}
            value={value}
            setValue={setValue}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleTheme}>
            <IoPersonSharp className="icon" />
          </IconButton>
          <Badge badgeContent={2}>
            <IconButton>
              <IoIosNotifications className="icon" />
            </IconButton>
          </Badge>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <IoPersonSharp className="icon" />
          </IconButton>
          <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logOut());
                enqueueSnackbar("You have been logged out", {
                  variant: "warning",
                  autoHideDuration: 2000,
                });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </AppbarWrapper>
    </div>
  );
};

export default AppBar;
