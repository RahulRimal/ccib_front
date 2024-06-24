import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import GlobalStyle, { theme } from "./theme";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import LoanForm from "./pages/LoanForm";
import FinancePage from "./pages/FinancePage";
import CompanyPage from "./pages/CompanyPage";
import LoanApplicationPage from "./pages/LoanApplicationPage";
import LoansPage from "./pages/LoansPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportPage from "./pages/ReportsPage";
import EmployeeProfile from "./pages/EmployeeProfile";
import LandingPage from "./pages/landing_page/LandingPage";
import FormsBasePage from "./pages/base_form/FormsBasePage";
import UsersPage from "./pages/UsersPage";
import { NoLayout, DashboardLayout } from "./layout";
import { tokensAvailable } from "./helpers";
import { updateAuthentication } from "./features/authSlice";

export const DrawerWidthContext = React.createContext();
export const drawerMinWidth = 50;
export const drawerMaxWidth = 250;

const App = () => {
  const [themeMode, setThemeMode] = React.useState("light");
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");
  const [drawerWidth, setDrawerWidth] = React.useState(drawerMaxWidth);
  const { isLoggedIn } = useSelector((store) => store.auth);

  const toggleDrawer = () => {
    setDrawerWidth(
      drawerWidth === drawerMaxWidth ? drawerMinWidth : drawerMaxWidth
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn && tokensAvailable())
      dispatch(updateAuthentication({ name: "isLoggedIn", value: true }));
  }, []);

  const router = createBrowserRouter(
    isLoggedIn
      ? [
          {
            path: "/",
            element: (
              <DashboardLayout
                drawerWidth={drawerWidth}
                toggleDrawer={toggleDrawer}
                toggleTheme={toggleTheme}
              />
            ),
            children: [
              {
                path: "/",
                element: <Dashboard />,
              },
              {
                path: "/users",
                element: <UsersPage />,
              },
              {
                path: "/add",
                element: <FormsBasePage />,
                index: true,
              },
              {
                path: "/add/:formKey",
                element: <FormsBasePage />,
              },

              {
                path: "/user-profile",
                element: <UserProfile />,
              },
              {
                path: "/finance",
                element: <FinancePage />,
              },
              {
                path: "/company",
                element: <CompanyPage />,
              },
              {
                path: "/loan-application",
                element: <LoanApplicationPage />,
              },
              {
                path: "/users/:id",
                element: <UserProfile />,
              },
              {
                path: "/application",
                element: <LoanForm />,
              },
              {
                path: "/loans",
                element: <LoansPage />,
              },
              {
                path: "/report",
                element: <ReportPage />,
              },
              {
                path: "/profile",
                element: <EmployeeProfile />,
              },
            ],
          },
          {
            path: "/signin",
            element: <SignIn />,
          },
          {
            path: "*",
            element: <LandingPage />,
          },
        ]
      : [
          {
            path: "/",
            element: <NoLayout />,
            children: [
              {
                path: "/",
                element: <LandingPage />,
              },
              {
                path: "*",
                element: <LandingPage />,
              },
              {
                path: "/signin",
                element: <SignIn />,
              },
            ],
          },
        ]
  );

  return (
    <>
      <ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
        <GlobalStyle />
        <DrawerWidthContext.Provider value={{ drawerWidth }}>
          <RouterProvider router={router} />
        </DrawerWidthContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
