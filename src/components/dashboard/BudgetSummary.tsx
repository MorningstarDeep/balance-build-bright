
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { fetchBudgets, Budget } from "@/services/budgets";

export const BudgetSummary: React.FC = () => {
  const { data: budgets = [], isLoading, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets
  });

  // Get the top 3 budgets
  const topBudgets = budgets.slice(0, 3);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Budget Overview</CardTitle>
        <a href="/budget" className="text-sm text-primary hover:underline">
          Manage Budgets
        </a>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load budgets</p>
          </div>
        ) : topBudgets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No budgets yet</p>
            <a href="/budget" className="text-primary hover:underline block mt-2">
              Create your first budget
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {topBudgets.map((budget: Budget) => {
              const spent = budget.limit_amount - budget.remaining;
              const percentUsed = (spent / budget.limit_amount) * 100;
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{budget.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ₹{spent.toLocaleString('en-IN')} / ₹{budget.limit_amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress 
                    value={percentUsed} 
                    className={`h-2 ${percentUsed > 90 ? 'bg-red-500' : percentUsed > 70 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  />
                </div>
              );
            })}
            
            {topBudgets.length > 0 && (
              <a href="/budget" className="text-sm text-primary hover:underline block text-center mt-4">
                View all budgets
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
