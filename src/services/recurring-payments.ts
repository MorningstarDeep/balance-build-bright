
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface RecurringPayment {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  category_id: string | null;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  start_date: string;
  end_date: string | null;
  next_payment: string;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    icon: string | null;
  };
}

export interface RecurringPaymentFormData {
  name: string;
  amount: number;
  category_id: string | null;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  start_date: string;
  end_date?: string | null;
}

export const fetchRecurringPayments = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("recurring_payments")
      .select(`
        *,
        category:category_id (
          name,
          icon
        )
      `)
      .eq("user_id", user.user.id)
      .order("next_payment", { ascending: true });

    if (error) {
      throw error;
    }

    return data as RecurringPayment[];
  } catch (error: any) {
    console.error("Error fetching recurring payments:", error.message);
    toast.error("Failed to load recurring payments");
    return [];
  }
};

export const createRecurringPayment = async (payment: RecurringPaymentFormData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // Set initial next payment date to the start date
    const next_payment = payment.start_date;

    const { data, error } = await supabase
      .from("recurring_payments")
      .insert({
        ...payment,
        next_payment,
        user_id: user.user.id,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    toast.success("Recurring payment created successfully");
    return data;
  } catch (error: any) {
    console.error("Error creating recurring payment:", error.message);
    toast.error("Failed to create recurring payment");
    throw error;
  }
};

export const updateRecurringPayment = async (id: string, payment: Partial<RecurringPaymentFormData>) => {
  try {
    const { data, error } = await supabase
      .from("recurring_payments")
      .update(payment)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Recurring payment updated successfully");
    return data;
  } catch (error: any) {
    console.error("Error updating recurring payment:", error.message);
    toast.error("Failed to update recurring payment");
    throw error;
  }
};

export const deleteRecurringPayment = async (id: string) => {
  try {
    const { error } = await supabase
      .from("recurring_payments")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Recurring payment deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting recurring payment:", error.message);
    toast.error("Failed to delete recurring payment");
    throw error;
  }
};
