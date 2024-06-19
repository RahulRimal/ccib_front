import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyle, { theme } from "./theme";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
import LoanForm from "./pages/LoanForm";
import FinancePage from "./pages/FinancePage";
import CompanyPage from "./pages/CompanyPage";
import LoanApplicationPage from "./pages/LoanApplicatinPage";
import LoansPage from "./pages/LoansPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportPage from "./pages/ReportsPage";
import EmployeeProfile from "./pages/EmployeeProfile";
import LandingPage from "./pages/landing_page/LandingPage";
import FormsBasePage from "./pages/base_form/FormsBasePage";
import UsersPage from "./pages/UsersPage";

export const DrawerWidthContext = React.createContext();
export const drawerMinWidth = 50;
export const drawerMaxWidth = 250;

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [drawerWidth, setDrawerWidth] = useState(drawerMaxWidth);
  const { isLoggedIn } = useSelector((store) => store.auth);

  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");

  const toggleDrawer = () => {
    setDrawerWidth(
      drawerWidth === drawerMaxWidth ? drawerMinWidth : drawerMaxWidth
    );
  };

  const Layout = () => {
    return (
      <>
        <AppBar
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
          toggleTheme={toggleTheme}
        />
        <div
          className={`mainWrapper ${
            drawerWidth === drawerMaxWidth ? "open" : "close"
          }`}
        >
          <div>
            <Drawer drawerWidth={drawerWidth} />
          </div>
          <div>
            <div
              style={{
                width:
                  drawerWidth === drawerMaxWidth
                    ? "calc(100vw - 270px)"
                    : "calc(100vw - 70px)",
                // margin: "12px",
                marginBottom: 0,
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <SignIn />,
      // element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/users", element: <UsersPage /> },
        { path: "/add", element: <FormsBasePage />, index: true },
        { path: "/add/:formKey", element: <FormsBasePage /> },
        { path: "/user-profile", element: <UserProfile /> },
        { path: "/finance", element: <FinancePage /> },
        { path: "/company", element: <CompanyPage /> },
        { path: "/loan-application", element: <LoanApplicationPage /> },
        { path: "/users/:id", element: <UserProfile /> },
        { path: "/application", element: <LoanForm /> },
        { path: "/loans", element: <LoansPage /> },
        { path: "/report", element: <ReportPage /> },
        { path: "/profile", element: <EmployeeProfile /> },
      ],
    },
    { path: "/signin", element: <SignIn /> },
    { path: "*", element: <LandingPage /> },
  ]);

  return (
    <ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
      <GlobalStyle />
      <DrawerWidthContext.Provider value={{ drawerMaxWidth, drawerMinWidth }}>
        <RouterProvider router={router} />
      </DrawerWidthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
