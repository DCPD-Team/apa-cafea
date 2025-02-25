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
      expense_type: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          created_at: string
          description: string
          id: string
          sum: number
          updated_at: string | null
          what_for: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          sum: number
          updated_at?: string | null
          what_for: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          sum?: number
          updated_at?: string | null
          what_for?: string
        }
        Relationships: []
      }
      inactive_month: {
        Row: {
          created_at: string
          id: string
          inactive: boolean | null
          month_id: string | null
          person_id: string | null
          what_for_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          inactive?: boolean | null
          month_id?: string | null
          person_id?: string | null
          what_for_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          inactive?: boolean | null
          month_id?: string | null
          person_id?: string | null
          what_for_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inactive_month_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "months"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inactive_month_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inactive_month_what_for_id_fkey"
            columns: ["what_for_id"]
            isOneToOne: false
            referencedRelation: "expense_type"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_payments: {
        Row: {
          created_at: string
          expense_type_id: string
          id: string
          month_id: string
          paid: boolean | null
          person_id: string
        }
        Insert: {
          created_at?: string
          expense_type_id: string
          id?: string
          month_id: string
          paid?: boolean | null
          person_id: string
        }
        Update: {
          created_at?: string
          expense_type_id?: string
          id?: string
          month_id?: string
          paid?: boolean | null
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_payments_expense_type_id_fkey"
            columns: ["expense_type_id"]
            isOneToOne: false
            referencedRelation: "expense_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_payments_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "months"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_payments_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_prices: {
        Row: {
          id: string
          month_id: string | null
          price_value: number | null
          what_for_id: string | null
        }
        Insert: {
          id?: string
          month_id?: string | null
          price_value?: number | null
          what_for_id?: string | null
        }
        Update: {
          id?: string
          month_id?: string | null
          price_value?: number | null
          what_for_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monthly_prices_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "months"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_prices_what_for_id_fkey"
            columns: ["what_for_id"]
            isOneToOne: false
            referencedRelation: "expense_type"
            referencedColumns: ["id"]
          },
        ]
      }
      months: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          created_at: string
          id: string
          person_id: string
          sum: number
          updated_at: string | null
          what_for: string
        }
        Insert: {
          created_at?: string
          id?: string
          person_id: string
          sum: number
          updated_at?: string | null
          what_for: string
        }
        Update: {
          created_at?: string
          id?: string
          person_id?: string
          sum?: number
          updated_at?: string | null
          what_for?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      persons: {
        Row: {
          coffee: boolean
          created_at: string
          first_name: string
          id: string
          inactivation_date: string | null
          last_name: string
          updated_at: string
          water: boolean
        }
        Insert: {
          coffee?: boolean
          created_at?: string
          first_name: string
          id?: string
          inactivation_date?: string | null
          last_name: string
          updated_at?: string
          water?: boolean
        }
        Update: {
          coffee?: boolean
          created_at?: string
          first_name?: string
          id?: string
          inactivation_date?: string | null
          last_name?: string
          updated_at?: string
          water?: boolean
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_payments: {
        Row: {
          created_at: string
          id: string
          payment: number
          person_id: string
          what_for_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment: number
          person_id: string
          what_for_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment?: number
          person_id?: string
          what_for_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_payments_personId_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_payments_what_for_id_fkey"
            columns: ["what_for_id"]
            isOneToOne: false
            referencedRelation: "expense_type"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      app_permission:
        | "persons.add"
        | "persons.update"
        | "persons.delete"
        | "expenses.add"
        | "expenses.update"
        | "expenses.delete"
        | "payments.add"
        | "payments.update"
        | "payments.delete"
      app_role: "admin" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
