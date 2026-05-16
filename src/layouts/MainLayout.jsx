import React from "react";
import Footer from "../components/Footer.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="overflow-x-hidden">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
