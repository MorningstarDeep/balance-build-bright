
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -1200,
    date: "2025-04-22",
    category: "Groceries",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 45000,
    date: "2025-04-21",
    category: "Income",
  },
  {
    id: 3,
    description: "Electric Bill",
    amount: -2500,
    date: "2025-04-20",
    category: "Utilities",
  },
  {
    id: 4,
    description: "Restaurant Dinner",
    amount: -1800,
    date: "2025-04-19",
    category: "Food & Drinks",
  },
];

export const RecentTransactions: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <a href="/transactions" className="text-sm text-primary hover:underline">
          View All
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2">
              <div className="flex flex-col">
                <span className="font-medium">{transaction.description}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </span>
                  <Badge variant={transaction.amount < 0 ? "outline" : "default"} className={transaction.amount < 0 ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                    {transaction.category}
                  </Badge>
                </div>
              </div>
              <span className={`font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
