-- Create a security definer function to safely check user roles
-- This function bypasses RLS to prevent infinite recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.users 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;

-- Create new policies using the security definer function
CREATE POLICY "Admins can view all users" 
ON public.users 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update all users" 
ON public.users 
FOR UPDATE 
TO authenticated
USING (public.is_admin());

-- Update audit_logs policy to use the same pattern
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;

CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
TO authenticated
USING (public.is_admin());