
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  BarChart2, 
  User,
  Menu,
  X 
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
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
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary">FinanceTracker</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-primary bg-opacity-10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive(item.href) ? "text-primary" : "text-gray-400"}`} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="font-medium">U</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
