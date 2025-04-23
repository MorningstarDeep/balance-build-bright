
import React from "react";
import { Bell, Settings } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};
