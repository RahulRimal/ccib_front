"use client";
import { Inter } from "next/font/google";
import Providers from "@/app/Providers";
import React, { createContext } from "react";

import AppBar from "@/app/components/AppBar";
import Drawer from "@/app/components/Drawer";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export const DrawerWidthContext = createContext();
export const drawerMinWidth = 50;
export const drawerMaxWidth = 250;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = React.useState("light");
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");
  const [drawerWidth, setDrawerWidth] = React.useState(drawerMaxWidth);

  const toggleDrawer = () => {
    setDrawerWidth(
      drawerWidth === drawerMaxWidth ? drawerMinWidth : drawerMaxWidth
    );
  };
  return (
    <html lang="en">
      <head>{/* <title>CCIC Next</title> */}</head>
      <body className={inter.className}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <Providers>
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
                <div
                  style={{ maxWidth: "100%", margin: "12px", marginBottom: 0 }}
                >
                  {children}
                </div>
              </div>
            </Providers>
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
}
