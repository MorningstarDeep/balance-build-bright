
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";

const transactionData = [
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
  {
    id: 5,
    description: "Freelance Payment",
    amount: 15000,
    date: "2025-04-18",
    category: "Income",
  },
  {
    id: 6,
    description: "Mobile Recharge",
    amount: -500,
    date: "2025-04-17",
    category: "Utilities",
  },
  {
    id: 7,
    description: "Movie Tickets",
    amount: -1000,
    date: "2025-04-16",
    category: "Entertainment",
  },
  {
    id: 8,
    description: "Online Shopping",
    amount: -3200,
    date: "2025-04-15",
    category: "Shopping",
  },
];

const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<string | undefined>(undefined);

  const filteredTransactions = transactionData.filter((transaction) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory =
      !categoryFilter || transaction.category === categoryFilter;

    // Filter by transaction type
    const matchesType =
      !transactionType ||
      (transactionType === "income" && transaction.amount > 0) ||
      (transactionType === "expense" && transaction.amount < 0);

    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = [...new Set(transactionData.map((t) => t.category))];

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={undefined}>All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={undefined}>All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="font-medium text-gray-500 pb-3 pl-2">Description</th>
                    <th className="font-medium text-gray-500 pb-3">Category</th>
                    <th className="font-medium text-gray-500 pb-3">Date</th>
                    <th className="font-medium text-gray-500 pb-3 text-right pr-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 pl-2">{transaction.description}</td>
                      <td className="py-4">
                        <Badge variant={transaction.amount < 0 ? "outline" : "default"} className={transaction.amount < 0 ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className="py-4">
                        {new Date(transaction.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className={`py-4 text-right font-medium pr-2 ${
                        transaction.amount < 0 ? "text-red-600" : "text-green-600"
                      }`}>
                        {transaction.amount < 0 ? "-" : "+"}₹
                        {Math.abs(transaction.amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TransactionsPage;
