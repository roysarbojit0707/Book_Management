import React from "react";
import { Outlet } from "react-router-dom";
import { SettingSection } from "./Component/index";

function SettingSectionOutlet() {
  return (
    <div>
      <SettingSection />
      <Outlet />
    </div>
  );
}

export default SettingSectionOutlet;
