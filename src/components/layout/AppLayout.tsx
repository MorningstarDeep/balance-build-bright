
import React from "react";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};
