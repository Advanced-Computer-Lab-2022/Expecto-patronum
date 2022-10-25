import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fontsource/roboto/400.css"; // Defaults to weight 400.

import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
