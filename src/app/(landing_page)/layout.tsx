"use client";

import React from "react";
import Footer from "./home/components/Footer";
import Header from "./home/components/Header";
import Providers from "../Providers";
// import Footer from "./components/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>
        <>{children}</>
      </main>
      <Footer />
    </div>
  );
}
