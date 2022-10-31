import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fontsource/roboto/400.css"; // Defaults to weight 400.
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Head from "next/head";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { DataProvider } from "../context/DataContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Component {...pageProps} />
      {/* <Footer></Footer> */}
    </>
  );
}

export default MyApp;
