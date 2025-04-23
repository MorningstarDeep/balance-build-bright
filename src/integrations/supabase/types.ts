export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budgets: {
        Row: {
          category_id: string | null
          created_at: string
          end_date: string | null
          id: string
          limit_amount: number
          name: string
          period: string
          remaining: number
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          limit_amount: number
          name: string
          period: string
          remaining: number
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          limit_amount?: number
          name?: string
          period?: string
          remaining?: number
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      currency_rates: {
        Row: {
          base_currency: string
          id: string
          last_updated: string
          rate: number
          target_currency: string
        }
        Insert: {
          base_currency: string
          id?: string
          last_updated?: string
          rate: number
          target_currency: string
        }
        Update: {
          base_currency?: string
          id?: string
          last_updated?: string
          rate?: number
          target_currency?: string
        }
        Relationships: []
      }
      expense_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "expense_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_groups: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      expense_shares: {
        Row: {
          amount: number
          expense_id: string
          id: string
          is_settled: boolean
          settled_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          expense_id: string
          id?: string
          is_settled?: boolean
          settled_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          expense_id?: string
          id?: string
          is_settled?: boolean
          settled_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_shares_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "group_expenses"
            referencedColumns: ["id"]
          },
        ]
      }
      group_expenses: {
        Row: {
          amount: number
          created_at: string
          date: string
          description: string
          group_id: string
          id: string
          paid_by: string
        }
        Insert: {
          amount: number
          created_at?: string
          date?: string
          description: string
          group_id: string
          id?: string
          paid_by: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          description?: string
          group_id?: string
          id?: string
          paid_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_expenses_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "expense_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          created_at: string
          current_amount: number
          end_date: string | null
          id: string
          initial_amount: number
          interest_rate: number | null
          last_updated: string
          name: string
          start_date: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_amount: number
          end_date?: string | null
          id?: string
          initial_amount: number
          interest_rate?: number | null
          last_updated?: string
          name: string
          start_date: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_amount?: number
          end_date?: string | null
          id?: string
          initial_amount?: number
          interest_rate?: number | null
          last_updated?: string
          name?: string
          start_date?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      main_balance: {
        Row: {
          amount: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      recurring_payments: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string
          end_date: string | null
          frequency: string
          id: string
          name: string
          next_payment: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          next_payment: string
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          next_payment?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_payments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_goals: {
        Row: {
          created_at: string
          current_amount: number
          id: string
          name: string
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_amount?: number
          id?: string
          name: string
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_amount?: number
          id?: string
          name?: string
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transaction_categories: {
        Row: {
          icon: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          icon?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          icon?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      process_recurring_payments: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
