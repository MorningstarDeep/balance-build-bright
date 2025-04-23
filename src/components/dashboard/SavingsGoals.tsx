
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const savingsGoals = [
  {
    id: 1,
    name: "Vacation",
    saved: 25000,
    target: 60000,
    color: "bg-pink-500",
  },
  {
    id: 2,
    name: "New Laptop",
    saved: 45000,
    target: 75000,
    color: "bg-teal-500",
  }
];

export const SavingsGoals: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Savings Goals</CardTitle>
        <a href="/savings" className="text-sm text-primary hover:underline">
          View All
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {savingsGoals.map((goal) => {
            const percentSaved = (goal.saved / goal.target) * 100;
            
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
                    className={`h-2 ${goal.color}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{goal.saved.toLocaleString('en-IN')}</span>
                    <span>₹{goal.target.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
