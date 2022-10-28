import type { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <img style={{width: "100%"}} src="/images/3azama.jpg" />
      <Footer />
    </div>
  );
};

export default Home;
