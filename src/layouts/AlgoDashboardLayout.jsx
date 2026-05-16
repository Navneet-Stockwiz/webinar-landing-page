import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/AlgoStrategy/Header.jsx";
import Sidebar from "../components/AlgoStrategy/Sidebar.jsx";
import Footer from "../components/AlgoStrategy/Footer.jsx";

const AlgoDashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-white">
      <Header />
      <div className="flex">
        <div className="md:block hidden">
          <Sidebar />
        </div>
        <main className="flex-1 md:ml-[270px]">
          <div
            className={`md:bg-[#F9FCFF] bg-white border-white min-h-screen md:pt-[80px] pt-[90px]`}
          >
            <Outlet />
          </div>
            <Footer />
        </main>
      </div>
    </div>
  );
};

export default AlgoDashboardLayout;
