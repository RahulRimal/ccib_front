"use client";

import StyledComponentsRegistry from "./lib/registry";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from "../theme";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SnackbarProvider } from "notistack";

const Providers = (props: React.PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState("light");

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={themeMode === "light" ? theme.light : theme.dark}>
        <GlobalStyle />
        <Provider store={store}>
          < SnackbarProvider maxSnack={3}>
            {props.children}
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
