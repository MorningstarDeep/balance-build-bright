
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

const savingsData = [
  {
    id: 1,
    name: "Vacation",
    saved: 25000,
    target: 60000,
    deadline: "2025-12-01",
    color: "bg-pink-500",
    icon: "✈️",
  },
  {
    id: 2,
    name: "New Laptop",
    saved: 45000,
    target: 75000,
    deadline: "2025-08-15",
    color: "bg-blue-500",
    icon: "💻",
  },
  {
    id: 3,
    name: "Emergency Fund",
    saved: 120000,
    target: 300000,
    deadline: "2026-01-01",
    color: "bg-yellow-500",
    icon: "🛡️",
  },
  {
    id: 4,
    name: "Car Down Payment",
    saved: 150000,
    target: 400000,
    deadline: "2027-05-01",
    color: "bg-green-500",
    icon: "🚗",
  },
];

const SavingsPage: React.FC = () => {
  const calculateMonthsRemaining = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    return diffMonths < 0 ? 0 : diffMonths;
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Savings Goals</h1>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Savings Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsData.map((savings) => {
            const percentSaved = (savings.saved / savings.target) * 100;
            const monthsRemaining = calculateMonthsRemaining(savings.deadline);
            const monthlyContribution = monthsRemaining > 0 
              ? Math.ceil((savings.target - savings.saved) / monthsRemaining)
              : 0;

            return (
              <Card key={savings.id} className="overflow-hidden">
                <div className={`h-1 ${savings.color}`}></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                        <span>{savings.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{savings.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due {new Date(savings.deadline).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      Add Funds
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">
                        <span className="font-medium">₹{savings.saved.toLocaleString("en-IN")}</span> of ₹{savings.target.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm font-medium">
                        {percentSaved.toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={percentSaved}
                      className={`h-2 ${savings.color}`}
                    />

                    <div className="pt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount remaining:</span>
                        <span className="font-medium">₹{(savings.target - savings.saved).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Time remaining:</span>
                        <span className="font-medium">{monthsRemaining} months</span>
                      </div>
                      {monthsRemaining > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly goal:</span>
                          <span className="font-medium">₹{monthlyContribution.toLocaleString("en-IN")}/mo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add New Savings Goal Card */}
          <Card className="border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <CardContent className="h-full flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-gray-500" />
              </div>
              <p className="font-medium text-gray-600">Create New Savings Goal</p>
              <p className="text-sm text-gray-500 mt-1">Start saving for something special</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SavingsPage;
