import type { AppProps } from "next/app";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />);
}

export default MyApp;
