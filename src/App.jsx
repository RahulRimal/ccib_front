import React from "react";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import UserProfile from "./pages/UserProfile";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import GlobalStyle, { theme } from "./theme";
import SignIn from "./pages/SignIn";
import LoanForm from "./pages/LoanForm";
import FinancePage from "./pages/FinancePage";
import CompanyPage from "./pages/CompanyPage";
import LoanApplicationPage from "./pages/LoanApplicatinPage";
import LoansPage from "./pages/LoansPage";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportPage from "./pages/ReportsPage";
import EmployeeProfile from "./pages/EmployeeProfile";
import LandingPage from "./pages/landing_page/LandingPage";
import BaseForm from "./components/Forms/BaseForm";
import InquiryForm from "./components/Forms/InquiryForm";
import FormsBasePage from "./pages/base_form/FormsBasePage";
import UsersPage from "./pages/UsersPage";
import { store } from "./store";

export const DrawerWidthContext = React.createContext();
export const drawerMinWidth = 50;
export const drawerMaxWidth = 250;

const App = () => {
  const [themeMode, setThemeMode] = React.useState("light");
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");
  const [drawerWidth, setDrawerWidth] = React.useState(drawerMaxWidth);

  const toggleDrawer = () => {
    setDrawerWidth(
      drawerWidth === drawerMaxWidth ? drawerMinWidth : drawerMaxWidth
    );
  };

  const Layout = () => (
    <>
      <AppBar
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
        toggleTheme={toggleTheme}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${drawerWidth}px calc(100% - ${drawerWidth}px)`,
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: drawerWidth }}>
          <Drawer drawerWidth={drawerWidth} />
        </div>
        <div style={{ maxWidth: "100%", margin: "12px", marginBottom: 0 }}>
          <Outlet />
        </div>
      </div>
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
    <Provider store={store}>
      <ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
        <SnackbarProvider maxSnack={3}>
          <GlobalStyle />
          <DrawerWidthContext.Provider value={{ drawerWidth }}>
            <RouterProvider router={router} />
          </DrawerWidthContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
