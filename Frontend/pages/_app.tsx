import type { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Head from "next/head";

import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import DataContext, { DataProvider } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const { Rate, SetRate } = useContext(DataContext);

  useEffect(() => {
    console.log(Rate);
  }, [Rate]);

  return (
    <div className="bg-[#F4F4F4] relative">
      <DataProvider>
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </DataProvider>
    </div>
  );
}

export default MyApp;
