
import React from "react";
import { NavLink } from "react-router-dom";
import { ChartPie, Calendar, BellPlus, ArrowUp, ArrowDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: ChartPie },
  { title: "Transactions", url: "/transactions", icon: ArrowUp },
  { title: "Budget", url: "/budget", icon: Calendar },
  { title: "Goals", url: "/goals", icon: BellPlus },
  { title: "Reports", url: "/reports", icon: ArrowDown },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${
        collapsed ? "w-14" : "w-64"
      } border-r bg-white border-gray-200 dark:bg-black dark:border-gray-700 transition-colors duration-300`}
    >
      <SidebarContent>
        {/* Logo and Title */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ChartPie className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                  WalletWise
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your finance minister
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs font-semibold">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-black hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                  >
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Budget Card */}
        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-4 border border-green-200 dark:border-green-700 transition-colors duration-300">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                Monthly Budget
              </h3>
              <p className="text-xs text-gray-800 dark:text-gray-400 mb-2">
                You're doing great!
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
                $2,040 of $3,000 used
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
