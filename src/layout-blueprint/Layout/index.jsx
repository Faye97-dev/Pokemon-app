import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="md:p-10 p-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
