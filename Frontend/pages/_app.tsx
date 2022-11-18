import type { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { DataProvider } from "../context/DataContext";

function MyApp({ Component, pageProps }: AppProps) {
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
