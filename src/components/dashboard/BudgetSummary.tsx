
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const budgets = [
  {
    id: 1,
    category: "Groceries",
    spent: 3200,
    total: 5000,
    color: "bg-blue-500",
  },
  {
    id: 2,
    category: "Food & Drinks",
    spent: 4500,
    total: 6000,
    color: "bg-purple-500",
  },
  {
    id: 3,
    category: "Transportation",
    spent: 1200,
    total: 3000,
    color: "bg-green-500",
  },
];

export const BudgetSummary: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Budget Overview</CardTitle>
        <a href="/budget" className="text-sm text-primary hover:underline">
          Manage Budgets
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentUsed = (budget.spent / budget.total) * 100;
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{budget.category}</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{budget.spent.toLocaleString('en-IN')} / ₹{budget.total.toLocaleString('en-IN')}
                  </span>
                </div>
                <Progress 
                  value={percentUsed} 
                  className={`h-2 ${budget.color}`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
