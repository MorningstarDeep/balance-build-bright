import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import BudgetDialog from "@/components/budget/BudgetDialog";
import SavingsGoalDialog from "@/components/savings/SavingsGoalDialog";

interface QuickActionsProps {
  onActionComplete?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionComplete }) => {
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [isSavingsDialogOpen, setIsSavingsDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsIncomeDialogOpen(false);
    setIsExpenseDialogOpen(false);
    setIsBudgetDialogOpen(false);
    setIsSavingsDialogOpen(false);
    if (onActionComplete) onActionComplete();
  };

  return (
    <>
      <div className="rounded-2xl border-none bg-white/60 shadow-xl glass-morphism p-6 flex flex-col items-center justify-center relative transition-all duration-500 min-h-[270px]">
        <p className="text-xl font-bold mb-6 text-gray-800 text-center tracking-tight bg-gradient-to-tr from-primary to-blue-400 text-transparent bg-clip-text">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <Button
            variant="ghost"
            className="border border-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:border-primary/40 rounded-lg text-green-700 font-bold text-base hover-scale transition-all duration-200"
            onClick={() => setIsIncomeDialogOpen(true)}
          >
            + Income
          </Button>
          <Button
            variant="ghost"
            className="border border-transparent hover:bg-gradient-to-r hover:from-rose-50 hover:to-yellow-50 hover:border-primary/40 rounded-lg text-rose-700 font-bold text-base hover-scale transition-all duration-200"
            onClick={() => setIsExpenseDialogOpen(true)}
          >
            – Expense
          </Button>
          <Button
            variant="ghost"
            className="border border-transparent hover:bg-gradient-to-r hover:from-yellow-50 hover:to-blue-50 hover:border-primary/40 rounded-lg text-blue-700 font-bold text-base hover-scale transition-all duration-200"
            onClick={() => setIsBudgetDialogOpen(true)}
          >
            💸 Budget
          </Button>
          <Button
            variant="ghost"
            className="border border-transparent hover:bg-gradient-to-r hover:from-emerald-50 hover:to-indigo-50 hover:border-primary/40 rounded-lg text-indigo-700 font-bold text-base hover-scale transition-all duration-200"
            onClick={() => setIsSavingsDialogOpen(true)}
          >
            🏦 Saving
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <TransactionDialog
        isOpen={isIncomeDialogOpen}
        onClose={() => setIsIncomeDialogOpen(false)}
        onSuccess={handleSuccess}
        defaultType="income"
      />
      <TransactionDialog
        isOpen={isExpenseDialogOpen}
        onClose={() => setIsExpenseDialogOpen(false)}
        onSuccess={handleSuccess}
        defaultType="expense"
      />
      <BudgetDialog
        isOpen={isBudgetDialogOpen}
        onClose={() => setIsBudgetDialogOpen(false)}
        onSuccess={handleSuccess}
      />
      <SavingsGoalDialog
        isOpen={isSavingsDialogOpen}
        onClose={() => setIsSavingsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};
