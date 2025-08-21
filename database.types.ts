export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      contributions: {
        Row: {
          created_at: string;
          expense_type_id: string;
          id: string;
          payment: number;
          person_id: string;
        };
        Insert: {
          created_at?: string;
          expense_type_id: string;
          id?: string;
          payment: number;
          person_id: string;
        };
        Update: {
          created_at?: string;
          expense_type_id?: string;
          id?: string;
          payment?: number;
          person_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'contributions_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contributions_person_id_fkey';
            columns: ['person_id'];
            isOneToOne: false;
            referencedRelation: 'persons';
            referencedColumns: ['id'];
          },
        ];
      };
      expense_type: {
        Row: {
          active: boolean | null;
          id: string;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          id: string;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      expenses: {
        Row: {
          created_at: string;
          description: string;
          expense_type_id: string;
          id: string;
          sum: number;
          updated_at: string | null;
          year: number | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          expense_type_id: string;
          id?: string;
          sum: number;
          updated_at?: string | null;
          year?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          expense_type_id?: string;
          id?: string;
          sum?: number;
          updated_at?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'expenses_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
        ];
      };
      monthly_payments: {
        Row: {
          active: boolean | null;
          created_at: string;
          expense_type_id: string;
          id: string;
          month_id: string;
          paid: boolean | null;
          person_id: string;
          target_year: number;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string;
          expense_type_id: string;
          id?: string;
          month_id: string;
          paid?: boolean | null;
          person_id: string;
          target_year: number;
        };
        Update: {
          active?: boolean | null;
          created_at?: string;
          expense_type_id?: string;
          id?: string;
          month_id?: string;
          paid?: boolean | null;
          person_id?: string;
          target_year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'monthly_payments_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'monthly_payments_month_id_fkey';
            columns: ['month_id'];
            isOneToOne: false;
            referencedRelation: 'months';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'monthly_payments_person_id_fkey';
            columns: ['person_id'];
            isOneToOne: false;
            referencedRelation: 'persons';
            referencedColumns: ['id'];
          },
        ];
      };
      monthly_prices: {
        Row: {
          expense_type_id: string;
          id: string;
          month_id: string;
          price_value: number | null;
          year: number;
        };
        Insert: {
          expense_type_id?: string;
          id?: string;
          month_id?: string;
          price_value?: number | null;
          year?: number;
        };
        Update: {
          expense_type_id?: string;
          id?: string;
          month_id?: string;
          price_value?: number | null;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'monthly_prices_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'monthly_prices_month_id_fkey';
            columns: ['month_id'];
            isOneToOne: false;
            referencedRelation: 'months';
            referencedColumns: ['id'];
          },
        ];
      };
      months: {
        Row: {
          id: string;
          name: string;
          order: number;
        };
        Insert: {
          id: string;
          name?: string;
          order: number;
        };
        Update: {
          id?: string;
          name?: string;
          order?: number;
        };
        Relationships: [];
      };
      persons: {
        Row: {
          avatar_pic_path: string | null;
          created_at: string;
          first_name: string;
          id: string;
          inactivation_date: string | null;
          last_name: string;
          updated_at: string;
        };
        Insert: {
          avatar_pic_path?: string | null;
          created_at?: string;
          first_name: string;
          id?: string;
          inactivation_date?: string | null;
          last_name: string;
          updated_at?: string;
        };
        Update: {
          avatar_pic_path?: string | null;
          created_at?: string;
          first_name?: string;
          id?: string;
          inactivation_date?: string | null;
          last_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Insert: {
          id?: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Update: {
          id?: number;
          permission?: Database['public']['Enums']['app_permission'];
          role?: Database['public']['Enums']['app_role'];
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      remaining_balance_view: {
        Row: {
          expense_type_id: string | null;
          person_id: string | null;
          remaining_balance: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'contributions_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contributions_person_id_fkey';
            columns: ['person_id'];
            isOneToOne: false;
            referencedRelation: 'persons';
            referencedColumns: ['id'];
          },
        ];
      };
      remaining_balance_view_new: {
        Row: {
          expense_type_id: string | null;
          person_id: string | null;
          remaining_balance: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'contributions_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contributions_person_id_fkey';
            columns: ['person_id'];
            isOneToOne: false;
            referencedRelation: 'persons';
            referencedColumns: ['id'];
          },
        ];
      };
      wallet_sums_view: {
        Row: {
          expense_type_id: string | null;
          person_id: string | null;
          total_value: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'contributions_expense_type_id_fkey';
            columns: ['expense_type_id'];
            isOneToOne: false;
            referencedRelation: 'expense_type';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'contributions_person_id_fkey';
            columns: ['person_id'];
            isOneToOne: false;
            referencedRelation: 'persons';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission'];
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
      get_distinct_years: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_resource: {
        Args: { bucket_name: string; file_name: string; folder: string };
        Returns: string;
      };
      get_user_avatar: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      update_avatar: {
        Args: { new_avatar_path: string };
        Returns: undefined;
      };
    };
    Enums: {
      app_permission:
        | 'persons.add'
        | 'persons.update'
        | 'persons.delete'
        | 'expenses.add'
        | 'expenses.update'
        | 'expenses.delete'
        | 'payments.add'
        | 'payments.update'
        | 'payments.delete';
      app_role: 'admin' | 'moderator';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_permission: [
        'persons.add',
        'persons.update',
        'persons.delete',
        'expenses.add',
        'expenses.update',
        'expenses.delete',
        'payments.add',
        'payments.update',
        'payments.delete',
      ],
      app_role: ['admin', 'moderator'],
    },
  },
} as const;
