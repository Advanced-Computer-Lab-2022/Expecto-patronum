import type { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Head from "next/head";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import DataContext, { DataProvider } from "../context/DataContext";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Router from "next/router";
import PopupMessage from '../components/shared/PopupMessage/PopupMessage';

interface ContextState {
  popupMessageRef: any,
  viewPopupMessage: any,
}

const PopupMessageContext = createContext({} as ContextState);

function MyApp({ Component, pageProps }: AppProps) {

  // const { Rate, SetRate } = useContext(DataContext);
  const popupMessageRef = useRef<any>();

  // useEffect(() => {
  //   console.log(Rate);
  // }, [Rate]);

  function viewPopupMessage(text: string) {
    popupMessageRef.current.classList.toggle("right-2");
    popupMessageRef.current.classList.toggle("-right-[21rem]");
    popupMessageRef.current.children[3].innerHTML = text;
    ticker;
  }

  var ticker = setTimeout(function() {
    popupMessageRef.current?.classList.toggle("-right-[21rem]");
    popupMessageRef.current?.classList.toggle("right-2");
  }, 4000);

  return (
    <div className="bg-main">
      <PopupMessageContext.Provider value={{popupMessageRef, viewPopupMessage}} >
        <DataProvider>
          <Navbar></Navbar>
          <PopupMessage ref={popupMessageRef} ticker={ticker} />
          <Component {...pageProps} />
          <Footer></Footer>
        </DataProvider>
      </PopupMessageContext.Provider>
    </div>
  );
}

export default MyApp;
export { PopupMessageContext };
