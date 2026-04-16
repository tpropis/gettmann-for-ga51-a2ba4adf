-- Track campaign form submissions (supporters and volunteers) in one table with a form_type discriminator.
CREATE TYPE public.campaign_form_type AS ENUM ('supporter', 'volunteer');

CREATE TABLE public.campaign_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type public.campaign_form_type NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  zip text,
  phone text,
  volunteer_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_campaign_submissions_created_at ON public.campaign_submissions (created_at DESC);
CREATE INDEX idx_campaign_submissions_form_type ON public.campaign_submissions (form_type);

ALTER TABLE public.campaign_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) may submit a signup form.
CREATE POLICY "Anyone can submit a campaign form"
ON public.campaign_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read/update/delete policies: submissions are private to the campaign team
-- and accessible only via the Cloud dashboard / service role.