-- Revoke read access from anon/authenticated; only service_role should read submissions
REVOKE SELECT ON public.campaign_submissions FROM anon, authenticated;

-- Explicit restrictive deny on SELECT for clarity / defense-in-depth
DROP POLICY IF EXISTS "No public read of submissions" ON public.campaign_submissions;
CREATE POLICY "No public read of submissions"
ON public.campaign_submissions
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

-- Tighten INSERT policy: validate inputs instead of WITH CHECK (true)
DROP POLICY IF EXISTS "Anyone can submit a campaign form" ON public.campaign_submissions;
CREATE POLICY "Anyone can submit a validated campaign form"
ON public.campaign_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND (zip IS NULL OR length(zip) <= 20)
  AND (phone IS NULL OR length(phone) <= 30)
  AND (volunteer_type IS NULL OR length(volunteer_type) <= 100)
);