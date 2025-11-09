export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      interests: {
        Row: {
          created_at: string | null
          from_user_id: string
          id: string
          message: string | null
          status: string | null
          to_profile_id: string
        }
        Insert: {
          created_at?: string | null
          from_user_id: string
          id?: string
          message?: string | null
          status?: string | null
          to_profile_id: string
        }
        Update: {
          created_at?: string | null
          from_user_id?: string
          id?: string
          message?: string | null
          status?: string | null
          to_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interests_to_profile_id_fkey"
            columns: ["to_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_views: {
        Row: {
          id: string
          viewed_at: string | null
          viewed_profile_id: string
          viewer_user_id: string | null
        }
        Insert: {
          id?: string
          viewed_at?: string | null
          viewed_profile_id: string
          viewer_user_id?: string | null
        }
        Update: {
          id?: string
          viewed_at?: string | null
          viewed_profile_id?: string
          viewer_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_viewed_profile_id_fkey"
            columns: ["viewed_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about_me: string | null
          additional_photos: string[] | null
          annual_income: string | null
          caste: string | null
          created_at: string | null
          date_of_birth: string
          education: string | null
          email: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          height_cm: number | null
          id: string
          is_featured: boolean | null
          location_city: string | null
          location_country: string | null
          location_state: string | null
          looking_for: string | null
          marital_status: Database["public"]["Enums"]["marital_status"]
          mother_tongue: string | null
          occupation: string | null
          phone_number: string | null
          profile_photo_url: string | null
          profile_status: Database["public"]["Enums"]["profile_status"] | null
          religion: string | null
          subscription_end_date: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          about_me?: string | null
          additional_photos?: string[] | null
          annual_income?: string | null
          caste?: string | null
          created_at?: string | null
          date_of_birth: string
          education?: string | null
          email?: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          height_cm?: number | null
          id?: string
          is_featured?: boolean | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          looking_for?: string | null
          marital_status: Database["public"]["Enums"]["marital_status"]
          mother_tongue?: string | null
          occupation?: string | null
          phone_number?: string | null
          profile_photo_url?: string | null
          profile_status?: Database["public"]["Enums"]["profile_status"] | null
          religion?: string | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          about_me?: string | null
          additional_photos?: string[] | null
          annual_income?: string | null
          caste?: string | null
          created_at?: string | null
          date_of_birth?: string
          education?: string | null
          email?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          height_cm?: number | null
          id?: string
          is_featured?: boolean | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          looking_for?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status"]
          mother_tongue?: string | null
          occupation?: string | null
          phone_number?: string | null
          profile_photo_url?: string | null
          profile_status?: Database["public"]["Enums"]["profile_status"] | null
          religion?: string | null
          subscription_end_date?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender: "male" | "female" | "other"
      marital_status: "never_married" | "divorced" | "widowed" | "separated"
      profile_status: "pending" | "approved" | "rejected" | "suspended"
      subscription_plan: "free" | "monthly" | "yearly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender: ["male", "female", "other"],
      marital_status: ["never_married", "divorced", "widowed", "separated"],
      profile_status: ["pending", "approved", "rejected", "suspended"],
      subscription_plan: ["free", "monthly", "yearly"],
    },
  },
} as const
