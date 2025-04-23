
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SavingsGoal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoalFormData {
  name: string;
  target_amount: number;
  target_date?: string | null;
}

export const fetchSavingsGoals = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", user.user.id);

    if (error) {
      throw error;
    }

    return data as SavingsGoal[];
  } catch (error: any) {
    console.error("Error fetching savings goals:", error.message);
    toast.error("Failed to load savings goals");
    return [];
  }
};

export const createSavingsGoal = async (savingsGoal: SavingsGoalFormData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("savings_goals")
      .insert({
        ...savingsGoal,
        current_amount: 0, // Start with 0
        user_id: user.user.id,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    toast.success("Savings goal created successfully");
    return data;
  } catch (error: any) {
    console.error("Error creating savings goal:", error.message);
    toast.error("Failed to create savings goal");
    throw error;
  }
};

export const addToSavingsGoal = async (goalId: string, amount: number) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // First, get the current goal to check details
    const { data: goal, error: goalError } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("id", goalId)
      .single();
    
    if (goalError) {
      throw goalError;
    }
    
    // Create transaction for savings
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id: user.user.id,
        amount: amount,
        type: "savings",
        description: `Contribution to ${goal.name}`,
        date: new Date().toISOString(),
      });
      
    if (transactionError) {
      throw transactionError;
    }
    
    // Update the savings goal amount
    const { data, error } = await supabase
      .from("savings_goals")
      .update({
        current_amount: goal.current_amount + amount,
        updated_at: new Date().toISOString()
      })
      .eq("id", goalId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Funds added to savings goal");
    return data;
  } catch (error: any) {
    console.error("Error adding to savings goal:", error.message);
    toast.error("Failed to add to savings goal");
    throw error;
  }
};

export const updateSavingsGoal = async (id: string, savingsGoal: Partial<SavingsGoalFormData>) => {
  try {
    const { data, error } = await supabase
      .from("savings_goals")
      .update(savingsGoal)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Savings goal updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error updating savings goal:", error.message);
    toast.error("Failed to update savings goal");
    throw error;
  }
};

export const deleteSavingsGoal = async (id: string) => {
  try {
    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Savings goal deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting savings goal:", error.message);
    toast.error("Failed to delete savings goal");
    throw error;
  }
};
