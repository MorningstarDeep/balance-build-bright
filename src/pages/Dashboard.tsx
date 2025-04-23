
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetSummary } from "@/components/dashboard/BudgetSummary";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AccountOverview />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="md:col-span-1">
          <BudgetSummary />
        </div>
        <div className="md:col-span-1">
          <SavingsGoals />
        </div>
        <div className="md:col-span-1">
          <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-center mb-2">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              <button className="bg-white hover:bg-gray-50 text-primary py-2 px-4 rounded-md border border-gray-200 shadow-sm text-sm font-medium">
                Add Income
              </button>
              <button className="bg-white hover:bg-gray-50 text-primary py-2 px-4 rounded-md border border-gray-200 shadow-sm text-sm font-medium">
                Add Expense
              </button>
              <button className="bg-white hover:bg-gray-50 text-primary py-2 px-4 rounded-md border border-gray-200 shadow-sm text-sm font-medium">
                Add Budget
              </button>
              <button className="bg-white hover:bg-gray-50 text-primary py-2 px-4 rounded-md border border-gray-200 shadow-sm text-sm font-medium">
                Add Saving
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
