
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBudgets, deleteBudget, Budget } from "@/services/budgets";
import BudgetDialog from "@/components/budget/BudgetDialog";

const BudgetPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { data: budgets = [], isLoading, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets
  });

  const handleDeleteBudget = async (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      try {
        await deleteBudget(id);
        queryClient.invalidateQueries({ queryKey: ['budgets'] });
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['budgets'] });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Budget Tracker</h1>
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Budget
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load budgets</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget: Budget) => {
              const spent = budget.limit_amount - budget.remaining;
              const percentUsed = (spent / budget.limit_amount) * 100;
              const isOverBudget = percentUsed > 100;

              return (
                <Card key={budget.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          <span>{budget.category?.icon || "💰"}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{budget.name}</h3>
                          <p className="text-sm text-muted-foreground">{budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteBudget(budget.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          <span className="font-medium">₹{spent.toLocaleString("en-IN")}</span> of ₹{budget.limit_amount.toLocaleString("en-IN")}
                        </span>
                        <span className={`text-sm font-medium ${isOverBudget ? "text-red-600" : ""}`}>
                          {percentUsed.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={percentUsed > 100 ? 100 : percentUsed}
                        className={`h-2 ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
                      />
                      {isOverBudget && (
                        <p className="text-xs text-red-600 mt-1">
                          Over budget by ₹{(spent - budget.limit_amount).toLocaleString("en-IN")}
                        </p>
                      )}

                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground">
                          {budget.remaining > 0
                            ? `₹${budget.remaining.toLocaleString("en-IN")} remaining`
                            : "Budget depleted"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Add New Budget Card */}
            <Card 
              className="border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <CardContent className="h-full flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <p className="font-medium text-gray-600">Create New Budget</p>
                <p className="text-sm text-gray-500 mt-1">Click to add a new category</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BudgetDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSuccess={handleSuccess} 
      />
    </AppLayout>
  );
};

export default BudgetPage;
