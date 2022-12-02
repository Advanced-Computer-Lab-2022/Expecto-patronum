import type { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Head from "next/head";

import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import DataContext, { DataProvider } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import React from "react";
import Spinner from "../components/shared/spinner/Spinner";
function MyApp({ Component, pageProps }: AppProps) {
  // const [loading, setLoading] = React.useState(false);
  // React.useEffect(() => {
  //   const start = () => {
  //     console.log("start");
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log("finished");
  //     setLoading(false);
  //   };
  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);

  return (
    <div className="bg-[#F4F4F4] relative">
      <DataProvider>
        {/* <Navbar></Navbar> */}
        <Component {...pageProps} />
        {/* <Footer></Footer> */}
      </DataProvider>


    </div>
  );
}

export default MyApp;
