import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please connect your project to Supabase using the green button in the top right corner of the Lovable interface.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'staff'
  status: 'active' | 'pending' | 'disabled'
  full_name?: string
  region?: string
  bio?: string
  profile_pic?: string
  social_links?: Record<string, string>
  created_at: string
  last_login?: string
}

export interface Image {
  id: string
  user_id: string
  disease: 'malaria' | 'leptospirosis'
  file_path: string
  gps_lat?: number
  gps_lon?: number
  location_text?: string
  notes?: string
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  analysis_json?: Record<string, any>
  uploaded_at: string
  user?: User
}

export interface Survey {
  id: string
  user_id: string
  disease: 'malaria' | 'leptospirosis'
  houses_surveyed: number
  positive_houses: number
  containers_inspected: number
  positive_containers: number
  rodent_sightings: number
  computed_indices?: Record<string, number>
  survey_date: string
  created_at: string
  user?: User
}

export interface Discussion {
  id: string
  user_id: string
  message: string
  parent_id?: string
  created_at: string
  user?: User
  replies?: Discussion[]
}

export interface AuditLog {
  id: string
  user_id?: string
  action: string
  details?: string
  created_at: string
  user?: User
}