
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  type: "income" | "expense" | "transfer" | "savings" | "investment" | "recurring";
  description: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    icon: string | null;
  };
}

export interface TransactionFormData {
  category_id: string | null;
  amount: number;
  type: "income" | "expense" | "transfer" | "savings" | "investment" | "recurring";
  description: string | null;
  date: string;
}

export const fetchTransactions = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        category:category_id (
          name,
          icon
        )
      `)
      .eq("user_id", user.user.id)
      .order("date", { ascending: false });

    if (error) {
      throw error;
    }

    return data as Transaction[];
  } catch (error: any) {
    console.error("Error fetching transactions:", error.message);
    toast.error("Failed to load transactions");
    return [];
  }
};

export const createTransaction = async (transaction: TransactionFormData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        ...transaction,
        user_id: user.user.id,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    toast.success("Transaction added successfully");
    return data;
  } catch (error: any) {
    console.error("Error creating transaction:", error.message);
    toast.error("Failed to add transaction");
    throw error;
  }
};

export const updateTransaction = async (id: string, transaction: Partial<TransactionFormData>) => {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .update(transaction)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Transaction updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error updating transaction:", error.message);
    toast.error("Failed to update transaction");
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Transaction deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting transaction:", error.message);
    toast.error("Failed to delete transaction");
    throw error;
  }
};

export const fetchTransactionCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("transaction_categories")
      .select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching transaction categories:", error.message);
    toast.error("Failed to load categories");
    return [];
  }
};
