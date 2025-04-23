
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MainBalance {
  id: string;
  user_id: string;
  amount: number;
  updated_at: string;
}

export const fetchMainBalance = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("main_balance")
      .select("*")
      .eq("user_id", user.user.id)
      .single();

    if (error) {
      throw error;
    }

    return data as MainBalance;
  } catch (error: any) {
    console.error("Error fetching main balance:", error.message);
    toast.error("Failed to load account balance");
    return null;
  }
};
