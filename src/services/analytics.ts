
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ExpenseByCategoryData {
  category: string;
  amount: number;
  icon?: string | null;
}

export interface MonthlyTotals {
  month: string;
  income: number;
  expense: number;
}

export const getExpensesByCategory = async (startDate: string, endDate: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(`
        amount,
        category:category_id (
          name,
          icon
        )
      `)
      .eq("user_id", user.user.id)
      .eq("type", "expense")
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) {
      throw error;
    }

    // Group by category
    const categoryMap = new Map<string, { amount: number; icon: string | null }>();
    
    transactions.forEach((transaction) => {
      const categoryName = transaction.category?.name || "Uncategorized";
      const existingCategory = categoryMap.get(categoryName);
      
      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        categoryMap.set(categoryName, { 
          amount: transaction.amount, 
          icon: transaction.category?.icon || null 
        });
      }
    });

    // Convert to array format
    const expensesByCategory: ExpenseByCategoryData[] = Array.from(categoryMap.entries()).map(
      ([category, data]) => ({
        category,
        amount: data.amount,
        icon: data.icon
      })
    );

    return expensesByCategory;
  } catch (error: any) {
    console.error("Error fetching expenses by category:", error.message);
    toast.error("Failed to load category analysis");
    return [];
  }
};

export const getMonthlyTotals = async (year: number) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("amount, type, date")
      .eq("user_id", user.user.id)
      .in("type", ["income", "expense"])
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) {
      throw error;
    }

    // Initialize month totals
    const monthlyTotals: MonthlyTotals[] = [];
    for (let i = 0; i < 12; i++) {
      const monthName = new Date(2000, i, 1).toLocaleString('default', { month: 'short' });
      monthlyTotals.push({
        month: monthName,
        income: 0,
        expense: 0
      });
    }

    // Process transactions
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // 0-11
      
      if (transaction.type === "income") {
        monthlyTotals[month].income += transaction.amount;
      } else if (transaction.type === "expense") {
        monthlyTotals[month].expense += transaction.amount;
      }
    });

    return monthlyTotals;
  } catch (error: any) {
    console.error("Error fetching monthly totals:", error.message);
    toast.error("Failed to load monthly analysis");
    return [];
  }
};

export const getBudgetVsActual = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // Get all active budgets
    const { data: budgets, error: budgetsError } = await supabase
      .from("budgets")
      .select(`
        id,
        name,
        limit_amount,
        remaining,
        category_id,
        period,
        start_date,
        end_date,
        category:category_id (
          name
        )
      `)
      .eq("user_id", user.user.id);

    if (budgetsError) {
      throw budgetsError;
    }

    // Transform data for chart use
    const budgetVsActualData = budgets.map(budget => {
      const spent = budget.limit_amount - budget.remaining;
      
      return {
        name: budget.name,
        categoryName: budget.category?.name || "Uncategorized",
        budget: budget.limit_amount,
        spent: spent,
        remaining: budget.remaining,
      };
    });

    return budgetVsActualData;
  } catch (error: any) {
    console.error("Error fetching budget vs actual data:", error.message);
    toast.error("Failed to load budget comparison");
    return [];
  }
};

export const getSavingsProgress = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data: savingsGoals, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", user.user.id);

    if (error) {
      throw error;
    }

    const savingsProgressData = savingsGoals.map(goal => {
      const percentComplete = (goal.current_amount / goal.target_amount) * 100;
      
      return {
        name: goal.name,
        target: goal.target_amount,
        current: goal.current_amount,
        remaining: goal.target_amount - goal.current_amount,
        percentComplete: percentComplete
      };
    });

    return savingsProgressData;
  } catch (error: any) {
    console.error("Error fetching savings progress data:", error.message);
    toast.error("Failed to load savings analysis");
    return [];
  }
};
