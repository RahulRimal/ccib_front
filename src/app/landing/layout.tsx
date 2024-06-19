import type { Metadata } from "next";
// import Providers from "../Providers";
// import { useTheme } from "styled-components";
// import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "CCIC",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const theme = useTheme();
  return (
    <div
      style={{
        // backgroundColor: theme.palette.common.white,
        width: "100%",
        position: "relative",
      }}
    >
      {/* <Navbar /> */}
      <main>{children}</main>

      {/* <Footer /> */}
    </div>
  );
}
