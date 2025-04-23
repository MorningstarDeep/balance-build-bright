
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSavingsGoals, deleteSavingsGoal, SavingsGoal } from "@/services/savings";
import SavingsGoalDialog from "@/components/savings/SavingsGoalDialog";
import AddFundsDialog from "@/components/savings/AddFundsDialog";

const SavingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  
  const { data: savingsGoals = [], isLoading, error } = useQuery({
    queryKey: ['savings-goals'],
    queryFn: fetchSavingsGoals
  });

  const calculateMonthsRemaining = (deadline: string | null): number => {
    if (!deadline) return 0;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    return diffMonths < 0 ? 0 : diffMonths;
  };
  
  const handleAddFunds = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setAddFundsDialogOpen(true);
  };

  const handleDeleteSavingsGoal = async (id: string) => {
    if (confirm("Are you sure you want to delete this savings goal?")) {
      try {
        await deleteSavingsGoal(id);
        queryClient.invalidateQueries({ queryKey: ['savings-goals'] });
      } catch (error) {
        console.error("Error deleting savings goal:", error);
      }
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['savings-goals'] });
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['main-balance'] });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Savings Goals</h1>
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Savings Goal
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load savings goals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsGoals.map((savings) => {
              const percentSaved = (savings.current_amount / savings.target_amount) * 100;
              const monthsRemaining = calculateMonthsRemaining(savings.target_date);
              const monthlyContribution = monthsRemaining > 0 
                ? Math.ceil((savings.target_amount - savings.current_amount) / monthsRemaining)
                : 0;

              return (
                <Card key={savings.id} className="overflow-hidden">
                  <div className="h-1 bg-pink-500"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          <span>💰</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{savings.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {savings.target_date ? 
                              `Due ${new Date(savings.target_date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                              })}` : 
                              'No deadline set'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="h-8 px-2 text-xs" onClick={() => handleAddFunds(savings)}>
                          Add Funds
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteSavingsGoal(savings.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">
                          <span className="font-medium">₹{savings.current_amount.toLocaleString("en-IN")}</span> of ₹{savings.target_amount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm font-medium">
                          {percentSaved.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={percentSaved}
                        className="h-2 bg-pink-500"
                      />

                      <div className="pt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount remaining:</span>
                          <span className="font-medium">₹{(savings.target_amount - savings.current_amount).toLocaleString("en-IN")}</span>
                        </div>
                        {savings.target_date && (
                          <>
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
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Add New Savings Goal Card */}
            <Card 
              className="border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <CardContent className="h-full flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <p className="font-medium text-gray-600">Create New Savings Goal</p>
                <p className="text-sm text-gray-500 mt-1">Start saving for something special</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <SavingsGoalDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSuccess={handleSuccess} 
      />
      
      {selectedGoal && (
        <AddFundsDialog 
          isOpen={addFundsDialogOpen} 
          onClose={() => setAddFundsDialogOpen(false)} 
          onSuccess={handleSuccess}
          goal={selectedGoal}
        />
      )}
    </AppLayout>
  );
};

export default SavingsPage;
