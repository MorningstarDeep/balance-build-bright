
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/transactions";
import { Transaction } from "@/services/transactions";

export const RecentTransactions: React.FC = () => {
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  // Get only the most recent 5 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <a href="/transactions" className="text-sm text-primary hover:underline">
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
            <p className="text-red-500">Failed to load transactions</p>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction: Transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-2">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {transaction.description || "No description"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </span>
                    <Badge variant={transaction.type === "expense" ? "outline" : "default"} 
                      className={transaction.type === "expense" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                      {transaction.category?.name || "Uncategorized"}
                    </Badge>
                  </div>
                </div>
                <span className={`font-medium ${transaction.type === "expense" ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.type === "expense" ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
