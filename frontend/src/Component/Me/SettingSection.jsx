import React from "react";
import { NavLink } from "react-router-dom";

function SettingSection() {
  return (
    <div className="h-20 w-full p-6 flex flex-col bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Settings
      </h2>
      <div className="border-b border-gray-300 dark:border-gray-700 mb-4">
        <nav className="flex space-x-6 text-gray-500 dark:text-gray-400">
          <NavLink
            to="/Main/Setting/Permissions"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            Permissions
          </NavLink>
          <NavLink
            to="/Main/Setting/Integrations"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            Integrations
          </NavLink>
          <NavLink
            to="/Main/Setting/Notifications"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            Notifications
          </NavLink>
          <NavLink
            to="/Main/Setting/KPIGoals"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            KPI Goals
          </NavLink>
          <NavLink
            to="/Main/Setting/Programmatic"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            Programmatic
          </NavLink>
          <NavLink
            to="/Main/Setting/EditSection"
            className={({ isActive }) =>
              isActive
                ? "text-violet-800 underline"
                : "hover:text-gray-900 dark:hover:text-gray-200"
            }
          >
            Edit Profile
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default SettingSection;
