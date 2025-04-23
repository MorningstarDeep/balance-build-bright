
import React from "react";
import { Sidebar } from "./Sidebar"; // Use app sidebar for navigation
// Removed: Navbar import to avoid duplicate navigation

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f9fafb] via-[#f4f7fa] to-[#e6eafe] transition-colors duration-700">
      <Sidebar />
      <main className="flex-1 overflow-auto p-0 md:p-8 transition-all duration-700">
        {children}
      </main>
    </div>
  );
};
