
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

const budgetData = [
  {
    id: 1,
    category: "Groceries",
    spent: 3200,
    total: 5000,
    color: "bg-blue-500",
    icon: "🛒",
  },
  {
    id: 2,
    category: "Food & Drinks",
    spent: 4500,
    total: 6000,
    color: "bg-purple-500",
    icon: "🍽️",
  },
  {
    id: 3,
    category: "Transportation",
    spent: 1200,
    total: 3000,
    color: "bg-green-500",
    icon: "🚗",
  },
  {
    id: 4,
    category: "Entertainment",
    spent: 2000,
    total: 2500,
    color: "bg-pink-500",
    icon: "🎬",
  },
  {
    id: 5,
    category: "Shopping",
    spent: 6000,
    total: 8000,
    color: "bg-yellow-500",
    icon: "🛍️",
  },
  {
    id: 6,
    category: "Utilities",
    spent: 2500,
    total: 5000,
    color: "bg-red-500",
    icon: "🔌",
  },
];

const BudgetPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Budget Tracker</h1>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add Budget
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetData.map((budget) => {
            const percentUsed = (budget.spent / budget.total) * 100;
            const isOverBudget = percentUsed > 100;

            return (
              <Card key={budget.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        <span>{budget.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{budget.category}</h3>
                        <p className="text-sm text-muted-foreground">Monthly Budget</p>
                      </div>
                    </div>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">
                        <span className="font-medium">₹{budget.spent.toLocaleString("en-IN")}</span> of ₹{budget.total.toLocaleString("en-IN")}
                      </span>
                      <span className={`text-sm font-medium ${isOverBudget ? "text-red-600" : ""}`}>
                        {percentUsed.toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={percentUsed > 100 ? 100 : percentUsed}
                      className={`h-2 ${isOverBudget ? "bg-red-100" : ""} ${budget.color}`}
                    />
                    {isOverBudget && (
                      <p className="text-xs text-red-600 mt-1">
                        Over budget by ₹{(budget.spent - budget.total).toLocaleString("en-IN")}
                      </p>
                    )}

                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        {budget.total - budget.spent > 0
                          ? `₹${(budget.total - budget.spent).toLocaleString("en-IN")} remaining`
                          : "Budget depleted"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add New Budget Card */}
          <Card className="border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <CardContent className="h-full flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-gray-500" />
              </div>
              <p className="font-medium text-gray-600">Create New Budget</p>
              <p className="text-sm text-gray-500 mt-1">Click to add a new category</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default BudgetPage;
