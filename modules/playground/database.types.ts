export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      event_avent_calendar: {
        Row: {
          codes: string[] | null
          completed: boolean
          created_at: string
          gold_ticket: boolean
          id: string
          nbr_tickets: number | null
          total_tickets: number
          user: string
          validated_codes: string[] | null
          win_position: number | null
        }
        Insert: {
          codes?: string[] | null
          completed?: boolean
          created_at?: string
          gold_ticket?: boolean
          id?: string
          nbr_tickets?: number | null
          total_tickets?: number
          user: string
          validated_codes?: string[] | null
          win_position?: number | null
        }
        Update: {
          codes?: string[] | null
          completed?: boolean
          created_at?: string
          gold_ticket?: boolean
          id?: string
          nbr_tickets?: number | null
          total_tickets?: number
          user?: string
          validated_codes?: string[] | null
          win_position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_avent_calendar_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          animators: string[] | null
          boardgames: string[] | null
          created_at: string
          created_by: string | null
          description: string
          end_date: string | null
          id: string
          irl: boolean
          links: string[] | null
          medias: string[] | null
          name: string
          places: string[] | null
          promotional: boolean
          slug: string
          start_date: string | null
          type: Database["public"]["Enums"]["event_types"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          animators?: string[] | null
          boardgames?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string
          end_date?: string | null
          id?: string
          irl?: boolean
          links?: string[] | null
          medias?: string[] | null
          name?: string
          places?: string[] | null
          promotional?: boolean
          slug: string
          start_date?: string | null
          type: Database["public"]["Enums"]["event_types"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          animators?: string[] | null
          boardgames?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string
          end_date?: string | null
          id?: string
          irl?: boolean
          links?: string[] | null
          medias?: string[] | null
          name?: string
          places?: string[] | null
          promotional?: boolean
          slug?: string
          start_date?: string | null
          type?: Database["public"]["Enums"]["event_types"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      events_animators: {
        Row: {
          created_at: string
          event_id: string
          is_co_animator: boolean
          staff_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          is_co_animator?: boolean
          staff_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          is_co_animator?: boolean
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_animators_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_animators_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          auth: string | null
          created_at: string
          id: string
          updated_at: string | null
        }
        Insert: {
          auth?: string | null
          created_at?: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          auth?: string | null
          created_at?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_fkey"
            columns: ["auth"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      staffs: {
        Row: {
          created_at: string
          description: string
          favorites_games: string[]
          fullname: string | null
          id: string
          join_at: string
          medias: string[] | null
          permissions: string[]
          profile: string | null
          socials: string[] | null
          teams: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          favorites_games: string[]
          fullname?: string | null
          id?: string
          join_at?: string
          medias?: string[] | null
          permissions: string[]
          profile?: string | null
          socials?: string[] | null
          teams?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          favorites_games?: string[]
          fullname?: string | null
          id?: string
          join_at?: string
          medias?: string[] | null
          permissions?: string[]
          profile?: string | null
          socials?: string[] | null
          teams?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staffs_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      test_func: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      event_types:
        | "animation_letsplay"
        | "animation_party"
        | "animation_new"
        | "animation_lab"
        | "tournament"
        | "event"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
