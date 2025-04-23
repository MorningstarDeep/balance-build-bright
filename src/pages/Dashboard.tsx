import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { BudgetSummary } from "@/components/dashboard/BudgetSummary";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <AccountOverview />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <RecentTransactions />
        </div>
        <div className="md:col-span-1">
          <BudgetSummary />
        </div>
        <div className="md:col-span-1">
          <SavingsGoals />
        </div>
        <div className="md:col-span-1">
          <QuickActions />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
