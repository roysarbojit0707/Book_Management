import React from "react";
import { MainHeader, MainFooter } from "./Component/index";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
}

export default MainLayout;
