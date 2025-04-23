
import React from "react";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetSummary } from "@/components/dashboard/BudgetSummary";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { QuickActions } from "@/components/dashboard/QuickActions";

// The AppLayout now wraps the sidebar
const Dashboard: React.FC = () => {
  return (
    <section className="min-h-screen bg-transparent pt-6 transition-all duration-700">
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full mx-auto max-w-7xl animate-fade-in"
        style={{ minHeight: "calc(100vh - 40px)" }}
      >
        <div className="lg:col-span-2 flex flex-col space-y-8">
          <AccountOverview />
          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-8">
          <div className="w-full">
            <QuickActions />
          </div>
          <div className="w-full">
            <BudgetSummary />
          </div>
          <div className="w-full">
            <SavingsGoals />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
