import type { NextPage } from "next";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Home;
