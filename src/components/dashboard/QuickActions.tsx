
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

  // Optional callback after successful action (can force Dashboard to refresh)
  const handleSuccess = () => {
    setIsIncomeDialogOpen(false);
    setIsExpenseDialogOpen(false);
    setIsBudgetDialogOpen(false);
    setIsSavingsDialogOpen(false);
    if (onActionComplete) onActionComplete();
  };

  return (
    <>
      <div className="h-64 rounded-xl border border-gray-200 bg-gradient-to-br from-white via-neutral-50 to-indigo-50 shadow-lg flex flex-col items-center justify-center overflow-hidden relative animate-fade-in transition-all">
        <p className="text-lg font-semibold text-gray-900 text-center mb-4 tracking-tight">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <Button
            variant="ghost"
            className="border border-gray-200/70 hover:bg-primary/5 hover:border-primary/40 transition"
            onClick={() => setIsIncomeDialogOpen(true)}
          >
            + Add Income
          </Button>
          <Button
            variant="ghost"
            className="border border-gray-200/70 hover:bg-primary/5 hover:border-primary/40 transition"
            onClick={() => setIsExpenseDialogOpen(true)}
          >
            - Add Expense
          </Button>
          <Button
            variant="ghost"
            className="border border-gray-200/70 hover:bg-primary/5 hover:border-primary/40 transition"
            onClick={() => setIsBudgetDialogOpen(true)}
          >
            &#128197; Add Budget
          </Button>
          <Button
            variant="ghost"
            className="border border-gray-200/70 hover:bg-primary/5 hover:border-primary/40 transition"
            onClick={() => setIsSavingsDialogOpen(true)}
          >
            &#128176; Add Saving
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
