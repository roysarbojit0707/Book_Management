import React from "react";
// import { HeaderLibrary, FooterLibrary } from "./Component/index";
import HeaderLibrary from "./Component/LibrarianLanding/HeaderLibrary.jsx";
import FooterLibrary from "./Component/LibrarianLanding/FooterLibrary.jsx";
import { Outlet } from "react-router-dom";
function LibraryLayout() {
  return (
    <>
      <HeaderLibrary />
      <Outlet />
      <FooterLibrary />
    </>
  );
}

export default LibraryLayout;
