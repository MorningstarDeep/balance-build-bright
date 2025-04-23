
import React, { useState, useEffect } from "react";
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
import { Plus, Search, Filter, ArrowUpDown, Trash2, Pencil } from "lucide-react";
import { fetchTransactions, deleteTransaction, fetchTransactionCategories, Transaction } from "@/services/transactions";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TransactionsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<string | undefined>(undefined);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch transactions
  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  // Fetch categories for filtering
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchTransactionCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    
    loadCategories();
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['main-balance'] }); // Refresh balance
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      (transaction.description && transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.category?.name && transaction.category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by category
    const matchesCategory =
      !categoryFilter || transaction.category_id === categoryFilter;

    // Filter by transaction type
    const matchesType =
      !transactionType ||
      (transactionType === "income" && transaction.type === "income") ||
      (transactionType === "expense" && transaction.type === "expense");

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['main-balance'] });
  };

  if (error) {
    toast.error("Failed to load transactions. Please try again.");
  }

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => setIsAddDialogOpen(true)}>
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
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            {isLoading ? (
              <div className="w-full p-8 text-center">
                <div className="inline-block w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-500">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="font-medium text-gray-500 pb-3 pl-2">Description</th>
                      <th className="font-medium text-gray-500 pb-3">Category</th>
                      <th className="font-medium text-gray-500 pb-3">Date</th>
                      <th className="font-medium text-gray-500 pb-3 text-right">Amount</th>
                      <th className="font-medium text-gray-500 pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction: Transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 pl-2">
                          {transaction.description || "No description"}
                        </td>
                        <td className="py-4">
                          <Badge variant={transaction.type === "expense" ? "outline" : "default"} 
                            className={transaction.type === "expense" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                            {transaction.category?.name || "Uncategorized"}
                          </Badge>
                        </td>
                        <td className="py-4">
                          {new Date(transaction.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className={`py-4 text-right font-medium ${
                          transaction.type === "expense" ? "text-red-600" : "text-green-600"
                        }`}>
                          {transaction.type === "expense" ? "-" : "+"}₹
                          {Math.abs(transaction.amount).toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 text-right pr-2">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteTransaction(transaction.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TransactionDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSuccess={handleSuccess} 
      />
    </AppLayout>
  );
};

export default TransactionsPage;
