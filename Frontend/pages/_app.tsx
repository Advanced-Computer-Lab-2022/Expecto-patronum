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
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

interface ContextState {
  viewPopupMessage: any,
}

const PopupMessageContext = createContext({} as ContextState);

function MyApp({ Component, pageProps }: AppProps) {

  // const { Rate, SetRate } = useContext(DataContext);
    // useEffect(() => {
  //   console.log(Rate);
  // }, [Rate]);

  const popupMessageRef = useRef<any>();
  var ticker = useRef<any>();
  const [popupIcon, setPopupIcon] = useState<any>(<FiAlertTriangle className='text-red-700 relative left-6 scale-[2.5]' />);
  const [isPopupOpen, setIsPopupOpen] = useState<any>();

  function viewPopupMessage(success: boolean, text: string) {
    setIsPopupOpen(true);
    if(isPopupOpen && text == popupMessageRef.current.children[3].innerHTML)
      return;
    popupMessageRef.current.classList.toggle("right-2");
    popupMessageRef.current.classList.toggle("-right-[21rem]");
    success ? setPopupIcon(<FiCheckCircle className='text-green-600 relative left-6 scale-[2.5]' />): setPopupIcon(<FiAlertTriangle className='text-red-700 relative left-6 scale-[2.5]' />);
    popupMessageRef.current.children[0].style.backgroundColor = success ? 'rgb(22, 163, 74)': '#D80621';
    popupMessageRef.current.children[2].innerHTML = success ? 'Success': 'Alert';
    popupMessageRef.current.children[3].innerHTML = text;
    ticker.current = setTimeout(() => {
      popupMessageRef.current?.classList.toggle("-right-[21rem]");
      popupMessageRef.current?.classList.toggle("right-2");
      setIsPopupOpen(false);
    }, 4000);
  }

  return (
    <div className="bg-main">
      <PopupMessageContext.Provider value={{viewPopupMessage}} >
        <DataProvider>
          <Navbar></Navbar>
          <PopupMessage ref={popupMessageRef} ticker={ticker} icon={popupIcon} setIsPopupOpen={setIsPopupOpen} />
          <Component {...pageProps} />
          <Footer></Footer>
        </DataProvider>
      </PopupMessageContext.Provider>
    </div>
  );
}

export default MyApp;
export { PopupMessageContext };
