
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { fetchMainBalance } from "@/services/account";
import { fetchTransactions } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";

export const AccountOverview: React.FC = () => {
  // Fetch main balance
  const { 
    data: balance, 
    isLoading: balanceLoading 
  } = useQuery({
    queryKey: ['main-balance'],
    queryFn: fetchMainBalance
  });

  // Fetch recent transactions to calculate monthly income and expenses
  const { 
    data: transactions,
    isLoading: transactionsLoading 
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  // Calculate monthly income and expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyIncome = transactions
    ? transactions
        .filter(t => 
          t.type === "income" && 
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0)
    : 0;

  const monthlyExpenses = transactions
    ? transactions
        .filter(t => 
          t.type === "expense" &&
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0)
    : 0;

  const isLoading = balanceLoading || transactionsLoading;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Account Overview</CardTitle>
        <Wallet className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold">₹{balance?.amount?.toLocaleString('en-IN') || '0'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1">
                <div className="flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  ₹{monthlyIncome.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center">
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                </div>
                <p className="text-lg font-semibold text-red-600">
                  ₹{monthlyExpenses.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Net this month</p>
                <p className={`text-lg font-semibold ${
                  monthlyIncome - monthlyExpenses >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {monthlyIncome - monthlyExpenses >= 0 ? '+' : '-'}
                  ₹{Math.abs(monthlyIncome - monthlyExpenses).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
