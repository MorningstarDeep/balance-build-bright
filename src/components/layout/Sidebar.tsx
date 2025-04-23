
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  PiggyBank,
  BarChart2,
  User,
  Menu,
  X,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: CreditCard },
    { name: "Budget", href: "/budget", icon: Wallet },
    { name: "Savings", href: "/savings", icon: PiggyBank },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg glass-morphism transition-colors duration-300"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-500 bg-white/60 backdrop-blur-xl border-r border-gray-100 shadow-2xl glass-morphism ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-100">
            <h1 className="text-2xl font-extrabold gradient-text bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text transition-all duration-500">
              Spendora
            </h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-base rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-[#dbeafe] to-[#f0fdfa] text-primary font-semibold shadow"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-[#e0e7ff] hover:to-[#f0fdfa] hover:text-primary"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive(item.href) ? "text-primary" : "text-gray-400"}`} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-blue-400 to-blue-300 text-white flex items-center justify-center font-semibold text-lg shadow">
                S
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-gray-700">User</p>
                <p className="text-xs text-gray-500">user@spendora.app</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
