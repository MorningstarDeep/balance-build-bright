
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Budget {
  id: string;
  user_id: string;
  category_id: string | null;
  name: string;
  limit_amount: number;
  remaining: number;
  period: "weekly" | "monthly" | "yearly";
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    icon: string | null;
  };
}

export interface BudgetFormData {
  name: string;
  category_id: string | null;
  limit_amount: number;
  period: "weekly" | "monthly" | "yearly";
  start_date: string;
  end_date?: string | null;
}

export const fetchBudgets = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("budgets")
      .select(`
        *,
        category:category_id (
          name,
          icon
        )
      `)
      .eq("user_id", user.user.id);

    if (error) {
      throw error;
    }

    return data as Budget[];
  } catch (error: any) {
    console.error("Error fetching budgets:", error.message);
    toast.error("Failed to load budgets");
    return [];
  }
};

export const createBudget = async (budget: BudgetFormData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // Set remaining to full amount initially
    const remaining = budget.limit_amount;

    const { data, error } = await supabase
      .from("budgets")
      .insert({
        ...budget,
        remaining,
        user_id: user.user.id,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    toast.success("Budget created successfully");
    return data;
  } catch (error: any) {
    console.error("Error creating budget:", error.message);
    toast.error("Failed to create budget");
    throw error;
  }
};

export const updateBudget = async (id: string, budget: Partial<BudgetFormData>) => {
  try {
    const { data, error } = await supabase
      .from("budgets")
      .update(budget)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Budget updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error updating budget:", error.message);
    toast.error("Failed to update budget");
    throw error;
  }
};

export const deleteBudget = async (id: string) => {
  try {
    const { error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Budget deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting budget:", error.message);
    toast.error("Failed to delete budget");
    throw error;
  }
};
