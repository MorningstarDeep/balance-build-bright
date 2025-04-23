
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { fetchSavingsGoals, SavingsGoal } from "@/services/savings";

export const SavingsGoals: React.FC = () => {
  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ['savings-goals'],
    queryFn: fetchSavingsGoals
  });

  // Get the top 2 savings goals
  const topGoals = goals.slice(0, 2);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <a href="/savings" className="text-sm text-primary hover:underline">
          View All
        </a>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load savings goals</p>
          </div>
        ) : topGoals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No savings goals yet</p>
            <a href="/savings" className="text-primary hover:underline block mt-2">
              Create your first goal
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {topGoals.map((goal: SavingsGoal) => {
              const percentSaved = (goal.current_amount / goal.target_amount) * 100;
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm font-medium">
                      {percentSaved.toFixed(0)}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress 
                      value={percentSaved} 
                      className="h-2 bg-pink-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹{goal.current_amount.toLocaleString('en-IN')}</span>
                      <span>₹{goal.target_amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {topGoals.length > 0 && (
              <a href="/savings" className="text-sm text-primary hover:underline block text-center mt-4">
                View all savings goals
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
