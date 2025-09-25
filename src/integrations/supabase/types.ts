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
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          id: string
          user_id: string | null
          disease: string
          houses_surveyed: number
          positive_houses: number
          containers_inspected: number
          positive_containers: number
          rodent_sightings: number
          computed_indices: Json | null
          survey_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          disease: string
          houses_surveyed?: number
          positive_houses?: number
          containers_inspected?: number
          positive_containers?: number
          rodent_sightings?: number
          computed_indices?: Json | null
          survey_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          disease?: string
          houses_surveyed?: number
          positive_houses?: number
          containers_inspected?: number
          positive_containers?: number
          rodent_sightings?: number
          computed_indices?: Json | null
          survey_date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          profile_pic: string | null
          region: string | null
          role: string
          social_links: Json | null
          status: string
          username: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          profile_pic?: string | null
          region?: string | null
          role?: string
          social_links?: Json | null
          status?: string
          username: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          profile_pic?: string | null
          region?: string | null
          role?: string
          social_links?: Json | null
          status?: string
          username: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      log_audit_event: {
        Args: { p_action: string; p_details?: string; p_user_id: string }
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
