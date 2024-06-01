import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import GlobalStyle, { theme } from "./theme";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import LoanForm from "./pages/LoanForm";
import FinancePage from "./pages/FinancePage";
import CompanyPage from "./pages/CompanyPage";
import LoanApplicationPage from "./pages/LoanApplicatinPage";
import LoansPage from "./pages/LoansPage";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportsPage from "./pages/ReportsPage";

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

  return (
    <ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
      <GlobalStyle />
      <DrawerWidthContext.Provider value={{ drawerWidth }}>
        {!isLoggedIn ? (
          <SignIn />
        ) : (
          <BrowserRouter>
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
              <Drawer drawerWidth={drawerWidth} />
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/finance" exact element={<FinancePage />} />
                <Route path="/company" exact element={<CompanyPage />} />
                <Route
                  path="/loan-application"
                  exact
                  element={<LoanApplicationPage />}
                />
                <Route path="/users/:id" exact element={<UserProfile />} />
                <Route path="/application" exact element={<LoanForm />} />
                <Route path="/loans" exact element={<LoansPage />} />
                <Route path="/dashboard" exact element={<Dashboard />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        )}
      </DrawerWidthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
